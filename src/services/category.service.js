import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import { paginate, paginateLink, strSlug } from '../utils/helpers.js'

/**
 *
 * @param {*} attributes
 * @returns {array|object}
 */
const getAll = async (attributes) => {
  const { size, page, skip } = paginate(attributes)
  let filters = []
  let orderBy = {}

  if (attributes.keyword) {
    filters.push({
      name: {
        contains: attributes.keyword,
      },
    })
  }

  if (attributes.sort_by == 'name') {
    Object.assign(orderBy, {
      name: attributes.sort_value,
    })
  }

  const categories = await prisma.categories.findMany({
    where: {
      AND: filters,
    },
    skip,
    take: size,
    orderBy,
    include: {
      category_campaign: {
        select: {
          category_id: true,
          campaign_id: true,
          campaigns: {
            select: {
              id: true,
              title: true,
              slug: true,
              short_description: true,
            },
          },
        },
      },
    },
  })

  const totalCategories = await prisma.categories.count({
    where: {
      AND: filters,
    },
  })

  return paginateLink({
    data: categories,
    size,
    page,
    total: totalCategories,
  })
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const create = async (attributes) => {
  const newSlug = strSlug(attributes.name)
  let category = await prisma.categories.findFirst({
    where: {
      slug: newSlug,
    },
  })

  if (category) {
    throw new ErrorMsg(400, 'Category already exists')
  }

  category = await prisma.categories.create({
    data: {
      name: attributes.name,
      slug: strSlug(attributes.name),
    },
  })

  return category
}

/**
 *
 * @param {number} id
 * @returns {object}
 */
const get = async (id) => {
  const category = await prisma.categories.findFirst({
    where: {
      id,
    },
    include: {
      category_campaign: {
        select: {
          id: true,
          category_id: true,
          campaign_id: true,
        },
      },
    },
  })

  if (!category) {
    throw new ErrorMsg(404, 'Category not found')
  }

  return category
}

/**
 *
 * @param {number} id
 * @param {*} attributes
 * @returns {object}
 */
const update = async (id, attributes) => {
  let category = await prisma.categories.findFirst({
    where: {
      id,
    },
    include: {
      category_campaign: {
        select: {
          id: true,
          category_id: true,
          campaign_id: true,
        },
      },
    },
  })

  if (!category) {
    throw new ErrorMsg(404, 'Category not found')
  }

  const newSlug = strSlug(attributes.name)
  const slugIsExists = await prisma.categories.findFirst({
    where: {
      slug: newSlug,
      id: {
        not: category.id,
      },
    },
  })

  if (slugIsExists) {
    throw new ErrorMsg(400, 'Category name already exists')
  }

  category = await prisma.categories.update({
    where: {
      id,
    },
    data: {
      name: attributes.name,
      slug: newSlug,
    },
  })

  return category
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  const category = await prisma.categories.findFirst({
    where: {
      id,
    },
  })

  if (!category) {
    throw new ErrorMsg(404, 'Category not found')
  }

  await prisma.categories.delete({
    where: {
      id,
    },
  })

  return null
}

export default { getAll, create, get, update, remove }
