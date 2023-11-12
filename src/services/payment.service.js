import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import { deleteSelectedProperties } from '../utils/helpers.js'
import fs from 'fs'

/**
 *
 * @param {*} attributes
 * @param {number} donationId
 * @returns {object}
 */
const create = async (attributes, donationId) => {
  const donation = await prisma.donations.findFirst({
    where: {
      id: donationId
    }
  })

  if (!donation) {
    throw new ErrorMsg(404, 'Donation not found')
  }

  let payment = await prisma.payments.findFirst({
    where: {
      order_number: donation.order_number
    }
  })

  if (payment) {
    throw new ErrorMsg(400, 'Payment already exists')
  }

  const [user_id, bank_id] = deleteSelectedProperties(attributes, [
    'user_id',
    'bank_id'
  ])

  payment = await prisma.payments.create({
    data: {
      ...attributes,
      donations: {
        connect: {
          order_number: donation.order_number
        }
      },
      users: {
        connect: {
          id: user_id
        }
      },
      bank: {
        connect: {
          id: bank_id
        }
      }
    },
    include: {
      donations: true,
      users: true,
      bank: true
    }
  })

  return payment
}

/**
 *
 * @param {number} donationId
 * @returns {object}
 */
const get = async (donationId) => {
  const donation = await prisma.donations.findFirst({
    where: {
      id: donationId
    }
  })

  if (!donation) {
    throw new ErrorMsg(404, 'Donation not found')
  }

  const payment = await prisma.payments.findFirst({
    where: {
      order_number: donation.order_number
    },
    include: {
      donations: true,
      users: true,
      bank: true
    }
  })

  return payment
}

/**
 *
 * @param {*} attributes
 * @param {number} donationId
 * @returns {object}
 */
const update = async (attributes, donationId) => {
  const donation = await prisma.donations.findFirst({
    where: {
      id: donationId
    }
  })

  if (!donation) {
    throw new ErrorMsg(404, 'Donation not found')
  }

  let payment = await prisma.payments.findFirst({
    where: {
      order_number: donation.order_number
    }
  })

  if (!payment) {
    throw new ErrorMsg(404, 'Payment not found')
  }

  const [user_id, bank_id] = deleteSelectedProperties(attributes, [
    'user_id',
    'bank_id'
  ])

  const paymentUpdated = await prisma.payments.update({
    where: {
      id: payment.id,
      order_number: donation.order_number
    },
    data: {
      ...attributes,
      donations: {
        connect: {
          order_number: donation.order_number
        }
      },
      users: {
        connect: {
          id: user_id
        }
      },
      bank: {
        connect: {
          id: bank_id
        }
      }
    },
    include: {
      donations: true,
      users: true,
      bank: true
    }
  })

  if (attributes.path_image && fs.existsSync(payment.path_image)) {
    fs.unlinkSync(payment.path_image)
  }

  return paymentUpdated
}

export default { create, get, update }
