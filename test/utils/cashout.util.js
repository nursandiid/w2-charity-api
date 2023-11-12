import prisma from '../../src/applications/database'

const createTestCashout = async (email, campaignTitle) => {
  const campaign = await prisma.campaigns.findFirst({
    where: {
      title: campaignTitle
    }
  })

  const bank = await prisma.bank.findFirst({
    where: {
      code: '002' // BRI
    }
  })
  
  await prisma.cashouts.create({
    data: {
      cashout_amount: 100_000,
      cashout_fee: 5_000,
      amount_received: 95_000,
      remaining_amount: 900_000,
      status: 'pending',
      reason_rejected: null,
      users: {
        connect: {
          email
        }
      },
      campaigns: {
        connect: {
          id: campaign.id
        }
      },
      bank: {
        connect: {
          id: bank.id
        }
      }
    }
  })
}

const removeTestCashout = async (email) => {
  await prisma.cashouts.deleteMany({
    where: {
      users: {
        email
      }
    }
  })
}

const getTestCashout = async (email, campaignTitle) => {
  const campaign = await prisma.campaigns.findFirst({
    where: {
      title: campaignTitle
    }
  })

  return await prisma.cashouts.findFirst({
    where: {
      users: {
        email
      },
      campaigns: {
        id: campaign.id
      }
    }
  })
}

export {
  createTestCashout,
  removeTestCashout,
  getTestCashout
}
