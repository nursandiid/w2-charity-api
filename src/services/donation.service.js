import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import { addLeadingZero, paginate, paginateLink } from '../utils/helpers.js'

/**
 *
 * @param {*} attributes
 * @returns {array|object}
 */
const getAll = async (attributes = []) => {
  const { size, page, skip } = paginate(attributes)
  let filters = []
  let orderBy = {}

  if (attributes.keyword) {
    filters.push({
      OR: [
        {
          campaigns: {
            title: {
              contains: attributes.keyword
            }
          }
        },
        {
          users: {
            name: {
              contains: attributes.keyword
            }
          }
        }
      ]
    })
  }

  if (attributes.sort_by) {
    switch (attributes.sort_by) {
      case 'donor':
        orderBy = {
          users: {
            name: attributes.sort_value
          }
        }
        break
      case 'title':
        orderBy = {
          campaigns: {
            title: attributes.sort_value
          }
        }
        break

      default:
        orderBy = {
          [attributes.sort_by]: attributes.sort_value
        }
        break
    }
  }

  const donations = await prisma.donations.findMany({
    where: {
      AND: filters
    },
    skip,
    take: size,
    orderBy,
    include: {
      campaigns: {
        include: {
          category_campaign: true
        }
      },
      users: true
    }
  })

  const totalDonations = await prisma.donations.count({
    where: {
      AND: filters
    }
  })

  return paginateLink(donations, size, page, totalDonations)
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const create = async (attributes) => {
  const campaign = await prisma.campaigns.findFirst({
    where: {
      id: attributes.campaign_id
    }
  })

  if (!campaign) {
    throw new ErrorMsg(400, 'Campaign not found')
  }

  const donation = await prisma.donations.create({
    data: {
      campaign_id: attributes.campaign_id,
      user_id: attributes.user_id,
      order_number:
        'PX' + addLeadingZero(Math.floor(Math.random() * 999999), 6),
      anonim: Boolean(attributes.anonim ?? 0),
      nominal: attributes.nominal,
      support: attributes.support,
      status: 'not_confirmed'
    },
    include: {
      campaigns: {
        include: {
          category_campaign: true
        }
      },
      users: true
    }
  })

  return donation
}

/**
 *
 * @param {number} id
 * @returns {object}
 */
const get = async (id) => {
  const donation = await prisma.donations.findFirst({
    where: {
      id
    },
    include: {
      campaigns: {
        include: {
          category_campaign: true
        }
      },
      users: true
    }
  })

  if (!donation) {
    throw new ErrorMsg(404, 'Donation not found')
  }

  return donation
}

/**
 *
 * @param {number} id
 * @param {*} attributes
 * @returns {object}
 */
const update = async (id, attributes) => {
  const campaign = await prisma.campaigns.findFirst({
    where: {
      id: attributes.campaign_id
    }
  })

  if (!campaign) {
    throw new ErrorMsg(400, 'Campaign not found')
  }

  let donation = await prisma.donations.findFirst({
    where: {
      id
    }
  })

  if (!donation) {
    throw new ErrorMsg(404, 'Donation not found')
  }

  let nominalCollected = campaign.nominal
  if (attributes.status === 'confirmed') {
    nominalCollected += donation.nominal
  }

  const [donationUpdated] = await prisma.$transaction([
    prisma.donations.update({
      where: {
        id,
        campaign_id: campaign.id
      },
      data: {
        status: attributes.status,
        campaigns: {
          update: {
            data: {
              nominal: nominalCollected
            }
          }
        }
      },
      include: {
        campaigns: {
          include: {
            category_campaign: true
          }
        },
        users: true
      }
    })
  ])

  return donationUpdated
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  const donation = await prisma.donations.findFirst({
    where: {
      id
    }
  })

  if (!donation) {
    throw new ErrorMsg(404, 'Donation not found')
  }

  await prisma.$transaction([
    prisma.payments.deleteMany({
      where: {
        order_number: donation.order_number
      }
    }),
    prisma.donations.delete({
      where: {
        id
      }
    })
  ])

  return null
}

export default { getAll, create, get, update, remove }
