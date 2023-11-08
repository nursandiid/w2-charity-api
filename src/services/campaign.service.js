import slug from 'slug'
import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import { deleteSelectedProperties } from '../utils/helpers.js'

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
      slug: newSlug,
    },
  })

  if (campaign) {
    throw new ErrorMsg(400, 'Campaign title already exists')
  }

  const categoryIds = deleteSelectedProperties(attributes, ['category_ids']).shift()
  const categories = await prisma.categories.findMany({
    where: {
      id: {
        in: categoryIds,
      },
    },
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
        create: categoryIds.map((category_id) => ({ category_id })),
      },
    },
    include: {
      category_campaign: {
        select: {
          categories: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
      users: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  })

  return campaign
}

/**
 *
 * @param {number} id
 * @returns {object}
 */
const get = async (id) => {
  //
}

/**
 *
 * @param {*} attributes
 * @param {number} id
 * @returns {object}
 */
const update = async (attributes, user, id) => {
  //
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  //
}

export default { getAll, create, get, update, remove }
