import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import bcrypt from 'bcrypt'
import { paginate, paginateLink } from '../utils/helpers.js'

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
          name: {
            contains: attributes.keyword
          },
          email: {
            contains: attributes.keyword
          }
        }
      ]
    })
  }

  if (attributes.sort_by) {
    switch (attributes.sort_by) {
      case 'campaigns_total':
        orderBy = {
          campaigns: {
            _count: 'desc'
          }
        }
        break
      case 'donations_total':
        break
      default:
        orderBy = {
          [attributes.sort_by]: attributes.sort_value
        }
        break
    }
  }

  const users = await prisma.users.findMany({
    where: {
      AND: filters
    },
    skip,
    take: size,
    orderBy,
    include: {
      campaigns: {
        select: {
          id: true,
          goal: true,
          nominal: true
        }
      },
      donations: {
        select: {
          id: true,
          nominal: true
        }
      }
    }
  })

  const totalUsers = await prisma.users.count({
    where: {
      AND: filters
    }
  })

  return paginateLink({ data: users, size, page, total: totalUsers })
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const create = async (attributes) => {
  let user = await prisma.users.findFirst({
    where: {
      email: attributes.email
    }
  })

  if (user) {
    throw new ErrorMsg(400, 'User already exists')
  }

  const donorRole = await prisma.roles.findFirst({
    where: {
      name: 'donor'
    }
  })

  user = await prisma.users.create({
    data: {
      name: attributes.name,
      email: attributes.email,
      password: await bcrypt.hash(attributes.password, 10),
      role_id: donorRole.id
    }
  })

  return user
}

/**
 *
 * @param {number} id
 * @returns {object}
 */
const get = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      id
    }
  })

  if (!user) {
    throw new ErrorMsg(404, 'User not found')
  }

  return user
}

/**
 *
 * @param {number} id
 * @param {*} attributes
 * @returns {object}
 */
const update = async (id, attributes) => {
  let user = await prisma.users.findFirst({
    where: {
      id
    }
  })

  if (!user) {
    throw new ErrorMsg(404, 'User not found')
  }

  user = await prisma.users.update({
    where: {
      id
    },
    data: {
      name: attributes.name,
      email: attributes.email,
      password: attributes.password
        ? await bcrypt.hash(attributes.password, 10)
        : user.password
    }
  })

  return user
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      id
    }
  })

  if (!user) {
    throw new ErrorMsg(404, 'User not found')
  }

  await prisma.users.delete({
    where: {
      id
    }
  })

  return null
}

export default { getAll, create, get, update, remove }
