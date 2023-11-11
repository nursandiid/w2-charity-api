import prisma from '../../src/applications/database.js'

const createTestPayment = async (email) => {
  const donation = await prisma.donations.findFirst({
    where: {
      users: {
        email
      }
    }
  })

  const bank = await prisma.bank.findFirst({
    where: {
      code: '002' // BRI
    }
  })

  await prisma.payments.create({
    data: {
      name: 'Test',
      nominal: 10000,
      note: '-',
      path_image: '-',
      bank: {
        connect: {
          id: bank.id
        }
      },
      users: {
        connect: {
          email
        }
      },
      donations: {
        connect: {
          order_number: donation.order_number
        }
      }
    }
  })
}

const removeTestPayment = async (email) => {
  await prisma.payments.deleteMany({
    where: {
      users: {
        email
      }
    }
  })
}

export { createTestPayment, removeTestPayment }
