import prisma from '../../src/applications/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createTestUser = async () => {
  const adminRole = await prisma.roles.findFirst({
    where: {
      name: 'admin',
    },
  })

  await prisma.users.create({
    data: {
      name: 'Nursandi',
      email: 'nursandi@example.com',
      password: await bcrypt.hash('123456', 10),
      roles: {
        connect: {
          id: adminRole.id,
        },
      },
    },
  })
}

const removeTestUser = async () => {
  await prisma.users.deleteMany({
    where: {
      email: 'nursandi@example.com',
    },
  })
}

const getTestUser = async (tokenExpiresIn = '1d') => {
  const user = await prisma.users.findFirst({
    where: {
      email: 'nursandi@example.com',
    },
    include: {
      roles: true,
    },
  })

  const accessToken = jwt.sign({ user }, process.env.JWT_TOKEN, {
    expiresIn: tokenExpiresIn,
  })

  return {
    ...user,
    access_token: accessToken,
  }
}

export { createTestUser, removeTestUser, getTestUser }
