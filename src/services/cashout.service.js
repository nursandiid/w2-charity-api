import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import { deleteSelectedProperties } from '../utils/helpers.js'

/**
 *
 * @param {*} attributes
 * @returns {array|object}
 */
const getAll = async (attributes = []) => {
  //
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
    },
    include: {
      donations: true
    }
  })

  if (!campaign) {
    throw new ErrorMsg(404, 'Campain not found')
  }

  const bank = await prisma.bank.findFirst({
    where: {
      id: attributes.bank_id
    }
  })

  if (!bank) {
    throw new ErrorMsg(404, 'Bank not found')
  }

  const cashout_amount = attributes.cashout_amount
  const cashout_fee = 5000
  const amount_received = cashout_amount - cashout_fee
  const remaining_amount = campaign.nominal - cashout_amount

  if (remaining_amount < 0) {
    throw new ErrorMsg(
      400,
      'Cashout are already greater than campaign amount collected'
    )
  }

  const cashout = await prisma.cashouts.create({
    data: {
      cashout_amount,
      cashout_fee,
      amount_received,
      remaining_amount,
      status: 'pending',
      campaigns: {
        connect: {
          id: campaign.id
        }
      },
      users: {
        connect: {
          id: attributes.user_id
        }
      },
      bank: {
        connect: {
          id: bank.id
        }
      }
    }
  })

  return cashout
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
    throw new ErrorMsg(404, 'Campain not found')
  }

  let cashout = await prisma.cashouts.findFirst({
    where: {
      id
    }
  })

  if (!cashout) {
    throw new ErrorMsg(404, 'Cashout not found')
  }

  let nominalCollected = campaign.nominal
  if (attributes.status === 'success') {
    nominalCollected -= cashout.cashout_amount
  }

  const [cashoutUpdated] = await prisma.$transaction([
    prisma.cashouts.update({
      where: {
        id
      },
      data: {
        status: attributes.status,
        reason_rejected: attributes.reason_rejected || cashout.reason_rejected,
        campaigns: {
          update: {
            data: {
              nominal: nominalCollected
            }
          }
        }
      },
      include: {
        campaigns: true
      }
    })
  ])

  return cashoutUpdated
}

/**
 *
 * @param {number} id
 * @returns {null}
 */
const remove = async (id) => {
  const cashout = await prisma.cashouts.findFirst({
    where: {
      id
    }
  })

  if (!cashout) {
    throw new ErrorMsg(404, 'Cashout not found')
  }

  await prisma.cashouts.delete({
    where: {
      id
    }
  })

  return null
}

export default { getAll, create, get, update, remove }
