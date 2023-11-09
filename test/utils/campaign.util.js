import { strSlug } from '../../src/utils/helpers.js'
import prisma from '../../src/applications/database.js'

const createTestCampaign = async (email, title = 'Campaign title 1') => {
  await prisma.campaigns.create({
    data: {
      title,
      slug: strSlug(title),
      short_description: '-',
      body: '-',
      status: 'publish',
      goal: 1000000,
      end_date: new Date('2023-12-01'),
      note: '-',
      receiver: 'Lainnya',
      publish_date: new Date(),
      path_image: '-',
      users: {
        connect: {
          email
        }
      }
      // category_ids: [],
    }
  })
}

const removeTestCampaign = async (title = 'Campaign title 1') => {
  await prisma.$transaction(async (prisma) => {
    await prisma.category_campaign.deleteMany({
      where: {
        campaigns: {
          title
        }
      }
    })

    await prisma.campaigns.deleteMany({
      where: {
        title
      }
    })
  })
}

const createDummyTestCampaigns = async (email, title = 'Campaign title') => {
  const user = await prisma.users.findFirst({
    where: {
      email
    }
  })

  let campaigns = []
  for (let i = 1; i <= 30; i++) {
    campaigns.push({
      title: `${title} ${i}`,
      slug: strSlug(`${title} ${i}`),
      short_description: '-',
      body: '-',
      status: 'publish',
      goal: 1000000,
      end_date: new Date('2023-12-01'),
      note: '-',
      receiver: 'Lainnya',
      publish_date: new Date(),
      path_image: '-',
      user_id: user.id
    })
  }

  await prisma.campaigns.createMany({
    data: campaigns
  })
}

const removeAllTestCampaigns = async () => {
  await prisma.$transaction([
    prisma.category_campaign.deleteMany(),
    prisma.campaigns.deleteMany()
  ])
}

const getTestCampaign = async (title = 'Campaign title 1') => {
  return await prisma.campaigns.findFirst({
    where: {
      title
    }
  })
}

export {
  createTestCampaign,
  removeTestCampaign,
  createDummyTestCampaigns,
  removeAllTestCampaigns,
  getTestCampaign
}
