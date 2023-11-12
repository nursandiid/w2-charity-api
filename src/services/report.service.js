import moment from 'moment'
import prisma from '../applications/database.js'

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
  let { data, startDate, endDate } = await getAll(attributes)

  return data
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
    [''][('no', 'date', 'income', 'expense', 'cash_balance')],
    ...data
  ]

  return data
}

export default { getAll, exportPDF, exportExcel }
