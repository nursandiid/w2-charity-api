import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
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
      email: {
        contains: attributes.keyword
      }
    })
  }

  if (attributes.sort_by) {
    orderBy = {
      [attributes.sort_by]: attributes.sort_value
    }
  }

  const subscribers = await prisma.subscribers.findMany({
    where: {
      AND: filters
    },
    skip,
    take: size,
    orderBy
  })

  const totalSubscribers = await prisma.subscribers.count({
    where: {
      AND: filters
    }
  })

  return paginateLink(subscribers, size, page, totalSubscribers)
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const create = async (attributes) => {
  let subscriber = await prisma.subscribers.findFirst({
    where: {
      email: attributes.email
    }
  })

  if (subscriber) {
    throw new ErrorMsg(400, 'You have subscribed')
  }

  subscriber = await prisma.subscribers.create({
    data: attributes
  })

  return subscriber
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  const subscriber = await prisma.subscribers.findFirst({
    where: {
      id
    }
  })

  if (!subscriber) {
    throw new ErrorMsg(404, 'Subscriber not found')
  }

  await prisma.subscribers.delete({
    where: {
      id
    }
  })

  return null
}

export default { getAll, create, remove }
