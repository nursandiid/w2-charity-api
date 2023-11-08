import slug from 'slug'
import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import { deleteSelectedProperties, strSlug } from '../utils/helpers.js'

/**
 *
 * @param {*} attributes
 * @returns {array|object}
 */
const getAll = async (attributes) => {
  //
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const create = async (attributes) => {
  const newSlug = slug(attributes.title)
  let campaign = await prisma.campaigns.findFirst({
    where: {
      slug: newSlug
    }
  })

  if (campaign) {
    throw new ErrorMsg(400, 'Campaign title already exists')
  }

  const categoryIds = deleteSelectedProperties(attributes, [
    'category_ids'
  ]).shift()
  const categories = await prisma.categories.findMany({
    where: {
      id: {
        in: categoryIds
      }
    }
  })

  if (categories.length !== categoryIds.length) {
    throw new ErrorMsg(400, 'Category Ids you entered is not valid')
  }

  campaign = await prisma.campaigns.create({
    data: {
      ...attributes,
      slug: newSlug,
      end_date: new Date(attributes.end_date),
      publish_date: new Date(attributes.publish_date),
      category_campaign: {
        create: categoryIds.map((category_id) => ({ category_id }))
      }
    },
    include: {
      category_campaign: {
        select: {
          categories: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })

  return campaign
}

/**
 *
 * @param {number} id
 * @returns {object}
 */
const get = async (id) => {
  const campaign = await prisma.campaigns.findFirst({
    where: {
      id
    },
    include: {
      category_campaign: {
        select: {
          categories: {
            select: {
              id: true,
              name: true,
              slug: true
            }
          }
        }
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  })

  if (!campaign) {
    throw new ErrorMsg(404, 'Campaign not found')
  }

  return campaign
}

/**
 *
 * @param {*} attributes
 * @param {number} id
 * @returns {object}
 */
const update = async (id, attributes) => {
  let campaign = await prisma.campaigns.findFirst({
    where: {
      id
    }
  })

  if (!campaign) {
    throw new ErrorMsg(404, 'Campaign not found')
  }

  const newSlug = strSlug(attributes.title)
  const slugIsExists = await prisma.campaigns.findFirst({
    where: {
      slug: newSlug,
      id: {
        not: id
      }
    }
  })

  if (slugIsExists) {
    throw new ErrorMsg(400, 'Campaign title already exists')
  }

  const categoryIds = deleteSelectedProperties(attributes, [
    'category_ids'
  ]).shift()

  const categories = await prisma.categories.findMany({
    where: {
      id: {
        in: categoryIds
      }
    }
  })

  if (categories.length !== categoryIds.length) {
    throw new ErrorMsg(400, 'Category Ids you entered is not valid')
  }

  if (attributes.end_date) {
    attributes.end_date = new Date(attributes.end_date)
  }
  if (attributes.publish_date) {
    attributes.publish_date = new Date(attributes.publish_date)
  }

  const [, updatedCampaign] = await prisma.$transaction([
    prisma.category_campaign.deleteMany({
      where: {
        campaign_id: campaign.id
      }
    }),
    prisma.campaigns.update({
      where: {
        id
      },
      data: {
        ...attributes,
        slug: newSlug,
        category_campaign: {
          create: categoryIds.map((category_id) => ({ category_id }))
        }
      },
      include: {
        category_campaign: {
          select: {
            categories: {
              select: {
                id: true,
                name: true,
                slug: true
              }
            }
          }
        },
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
  ])

  return updatedCampaign
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  const campaign = await prisma.campaigns.findFirst({
    where: {
      id
    }
  })

  if (!campaign) {
    throw new ErrorMsg(404, 'Campaign not found')
  }

  await prisma.$transaction([
    prisma.category_campaign.deleteMany({
      where: {
        campaign_id: campaign.id
      }
    }),
    prisma.campaigns.delete({
      where: {
        id
      }
    })
  ])

  return null
}

export default { getAll, create, get, update, remove }
