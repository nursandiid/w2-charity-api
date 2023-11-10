import prisma from '../../src/applications/database'
import { strRandom } from '../../src/utils/helpers'

const createTestContact = async () => {
  await prisma.contacts.create({
    data: {
      name: 'Test',
      phone: '1234',
      email: 'test@gmail.com',
      subject: 'Test contact',
      message: 'Pesan test contact'
    }
  })
}

const removeTestContact = async () => {
  await prisma.contacts.deleteMany({
    where: {
      email: 'test@gmail.com'
    }
  })
}

const getTestContact = async () => {
  return await prisma.contacts.findFirst({
    where: {
      email: 'test@gmail.com'
    }
  })
}

const createDummyTestContacts = async () => {
  let contacts = []
  for (let i = 1; i <= 30; i++) {
    contacts.push({
      name: `Test ${i}`,
      phone: `1234${i}`,
      email: `test${i}@gmail.com`,
      subject: strRandom(15),
      message: strRandom(50)
    })
  }

  await prisma.contacts.createMany({
    data: contacts
  })
}

const removeAllTestContacts = async () => {
  await prisma.contacts.deleteMany()
}

export {
  createTestContact,
  removeTestContact,
  getTestContact,
  createDummyTestContacts,
  removeAllTestContacts
}
