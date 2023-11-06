import slug from 'slug'
import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import { paginate, paginateLink } from '../utils/helpers.js'

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

const create = async (attributes) => {
  let category = await prisma.categories.count({
    where: {
      name: attributes.name,
    },
  })

  if (category) {
    throw new ErrorMsg(400, 'Category already exists')
  }

  category = await prisma.categories.create({
    data: {
      name: attributes.name,
      slug: slug(attributes.name),
    },
  })

  return category
}

const get = async (id) => {
  let category = await prisma.categories.findFirst({
    where: {
      id,
    },
  })

  if (!category) {
    throw new ErrorMsg(404, 'Category not found')
  }

  return category
}

const update = async (attributes, id) => {
  let category = await prisma.categories.findFirst({
    where: {
      id,
    },
  })

  if (!category) {
    throw new ErrorMsg(404, 'Category not found')
  }

  category = await prisma.categories.update({
    where: {
      id,
    },
    data: {
      name: attributes.name,
      slug: slug(attributes.name),
    },
  })

  return category
}

const remove = async (id) => {
  let category = await prisma.categories.findFirst({
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
