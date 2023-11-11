import { addLeadingZero } from '../../src/utils/helpers.js'
import prisma from '../../src/applications/database.js'

const createTestDonation = async (email, campaignTitle) => {
  const campaign = await prisma.campaigns.findFirst({
    where: {
      title: campaignTitle
    }
  })

  await prisma.donations.create({
    data: {
      order_number: addLeadingZero(Math.floor(Math.random() * 999999)),
      anonim: false,
      nominal: 1000000,
      support: '-',
      status: 'not_confirmed',
      users: {
        connect: {
          email
        }
      },
      campaigns: {
        connect: {
          id: campaign.id
        }
      }
    }
  })
}

const removeTestDonation = async (email) => {
  await prisma.$transaction([
    prisma.payments.deleteMany(),
    prisma.donations.deleteMany({
      where: {
        users: {
          email
        }
      }
    })
  ])
}

const createDummyTestDonations = async (email, campaignTitle) => {
  const campaign = await prisma.campaigns.findFirst({
    where: {
      title: campaignTitle
    }
  })

  const user = await prisma.users.findFirst({
    where: {
      email
    }
  })

  let donations = []
  for (let i = 1; i <= 30; i++) {
    donations.push({
      order_number: addLeadingZero(Math.floor(Math.random() * 999999)),
      anonim: false,
      nominal: 1000000,
      support: '-',
      status: 'not_confirmed',
      campaign_id: campaign.id, // must directly, not with connect
      user_id: user.id // must directly, not with connect
    })
  }

  await prisma.donations.createMany({
    data: donations
  })
}

const removeAllTestDonations = async () => {
  await prisma.$transaction([
    prisma.payments.deleteMany(),
    prisma.donations.deleteMany()
  ])
}

const getTestDonation = async (email) => {
  return await prisma.donations.findFirst({
    where: {
      users: {
        email
      }
    }
  })
}

export {
  createTestDonation,
  removeTestDonation,
  createDummyTestDonations,
  removeAllTestDonations,
  getTestDonation
}
