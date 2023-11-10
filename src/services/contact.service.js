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
      OR: [
        {
          name: {
            contains: attributes.keyword
          }
        },
        {
          subject: {
            contains: attributes.keyword
          }
        },
        {
          message: {
            contains: attributes.keyword
          }
        }
      ]
    })
  }

  if (attributes.sort_by) {
    orderBy = {
      [attributes.sort_by]: attributes.sort_value
    }
  }

  const contacts = await prisma.contacts.findMany({
    where: {
      AND: filters
    },
    skip,
    take: size,
    orderBy
  })

  const totalContacts = await prisma.contacts.count({
    where: {
      AND: filters
    }
  })

  return paginateLink(contacts, size, page, totalContacts)
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const create = async (attributes) => {
  const contact = await prisma.contacts.create({
    data: attributes
  })

  return contact
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  const contact = await prisma.contacts.findFirst({
    where: {
      id
    }
  })

  if (!contact) {
    throw new ErrorMsg(404, 'Contact not found')
  }

  await prisma.contacts.delete({
    where: {
      id
    }
  })

  return null
}

export default { getAll, create, remove }
