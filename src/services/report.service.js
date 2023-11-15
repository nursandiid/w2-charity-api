import moment from 'moment'
import prisma from '../applications/database.js'
import fs from 'fs'
import { v4 as uuid } from 'uuid'
import xlsx from 'node-xlsx'
import PDFDocument from 'pdfkit-table'

/**
 *
 * @param {*} attributes
 * @returns {array|object}
 */
const getAll = async (attributes = []) => {
  const startDate = attributes.start_date
    ? moment(attributes.start_date)
    : moment().subtract(1, 'months')
  const endDate = attributes.last_date ? moment(attributes.last_date) : moment()

  let donation = await prisma.donations.groupBy({
    by: ['created_at'],
    _sum: {
      nominal: true
    },
    where: {
      AND: [
        {
          status: 'confirmed'
        },
        {
          OR: [
            {
              created_at: {
                gte: startDate.toISOString()
              }
            },
            {
              created_at: {
                lte: endDate.toISOString()
              }
            }
          ]
        }
      ]
    }
  })
  let cashout = await prisma.cashouts.groupBy({
    by: ['created_at'],
    _sum: {
      amount_received: true,
      cashout_fee: true
    },
    where: {
      AND: [
        {
          status: 'success'
        },
        {
          OR: [
            {
              created_at: {
                gte: startDate.toISOString()
              }
            },
            {
              created_at: {
                lte: endDate.toISOString()
              }
            }
          ]
        }
      ]
    }
  })

  donation = donation.map((item) => ({
    [moment(item.created_at).format('YYYY-MM-DD')]: item._sum.nominal
  }))

  cashout = cashout.map((item) => ({
    [moment(item.created_at).format('YYYY-MM-DD')]: {
      amount_received: item._sum.amount_received,
      cashout_fee: item._sum.cashout_fee
    }
  }))

  let data = []
  let cashBalance = 0
  let loopDate = moment().subtract(1, 'months')

  for (let i = 1; i <= endDate.diff(startDate, 'days'); i++) {
    loopDate.add(1, 'days')

    // let income = donation
    //   .filter((item) => {
    //     return (
    //       moment(item.created_at).format('YYYY-MM-DD') ===
    //       loopDate.format('YYYY-MM-DD')
    //     )
    //   })
    //   .map((item) => item._sum.nominal)[0]

    let income = donation.find(
      (item) => Object.keys(item)[0] === loopDate.format('YYYY-MM-DD')
    )
    let expense = cashout.find(
      (item) => Object.keys(item)[0] === loopDate.format('YYYY-MM-DD')
    )

    if (income) income = Object.values(income)[0]
    else income = 0

    let { amount_received = 0, cashout_fee = 0 } = expense
      ? Object.values(expense)[0]
      : []

    income = income + cashout_fee
    cashBalance += income - amount_received

    data.push({
      no: i,
      date: loopDate.format('YYYY-MM-DD'),
      income: income,
      expense: amount_received,
      cash_balance: cashBalance
    })
  }

  return { data, startDate, endDate }
}

/**
 *
 * @param {*} attributes
 * @returns {array|object}
 */
const exportPDF = async (attributes = []) => {
  const { data, startDate, endDate } = await getAll(attributes)
  let tableData = data.map((item) => {
    return [item.no, item.date, item.income, item.expense, item.cash_balance]
  })

  const path = await new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({
      size: 'a4',
      margins: {
        top: 72,
        right: 72,
        bottom: 72,
        left: 72
      }
    })
    const path = `storage/${uuid()}.pdf`
    const stream = doc.pipe(fs.createWriteStream(path))

    doc.font('Times-Bold').fontSize(20).text('Laporan Penggalangan Dana', {
      align: 'center'
    })

    doc.font('Helvetica').fontSize(16)
    doc
      .text(
        `Tanggal ${startDate.format('YYYY-MM-DD')} s/d ${endDate.format(
          'YYYY-MM-DD'
        )}`,
        {
          align: 'center'
        }
      )
      .moveDown()

    const table = {
      headers: ['No', 'Date', 'Income', 'Expense', 'Cash Balance'],
      rows: [...tableData]
    }

    doc.table(table, {
      prepareHeader: () => doc.font('Helvetica').fontSize(12),
      prepareRow: () => doc.font('Helvetica').fontSize(12)
    })

    doc.end()

    stream.on('finish', () => {
      resolve(path)
    })

    doc.on('error', (err) => {
      reject(err)
    })
  })

  return path
}

/**
 *
 * @param {*} attributes
 * @returns {array|object}
 */
const exportExcel = async (attributes = []) => {
  let { data, startDate, endDate } = await getAll(attributes)
  data = data.map((item) => {
    return [item.no, item.date, item.income, item.expense, item.cash_balance]
  })

  data = [
    ['Laporan Penggalangan Dana'],
    [
      `Tanggal ${startDate.format('YYYY-MM-DD')} s/d ${endDate.format(
        'YYYY-MM-DD'
      )}`
    ],
    [''],
    [''],
    ['No', 'Date', 'Income', 'Expense', 'Cash Balance'],
    ...data
  ]

  const sheetOptions = {
    '!cols': [{ wch: 10 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }]
  }

  const buffer = xlsx.build([{ name: 'Sheet0', data }], {
    sheetOptions
  })
  const path = `storage/${uuid()}.xlsx`

  fs.writeFileSync(path, buffer)

  return path
}

export default { getAll, exportPDF, exportExcel }
