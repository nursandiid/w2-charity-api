import prisma from '../../src/applications/database'

const createTestSubscriber = async () => {
  await prisma.subscribers.create({
    data: {
      email: 'test@gmail.com'
    }
  })
}

const removeTestSubscriber = async () => {
  await prisma.subscribers.deleteMany({
    where: {
      email: 'test@gmail.com'
    }
  })
}

const getTestSubscriber = async () => {
  return await prisma.subscribers.findFirst({
    where: {
      email: 'test@gmail.com'
    }
  })
}

const createDummyTestSubscribers = async () => {
  let subscribers = []
  for (let i = 1; i <= 30; i++) {
    subscribers.push({
      email: `test${i}@gmail.com`,
    })
  }

  await prisma.subscribers.createMany({
    data: subscribers
  })
}

const removeAllTestSubscribers = async () => {
  await prisma.subscribers.deleteMany()
}

export {
  createTestSubscriber,
  removeTestSubscriber,
  getTestSubscriber,
  createDummyTestSubscribers,
  removeAllTestSubscribers
}
