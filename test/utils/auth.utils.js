import prisma from '../../src/applications/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createTestUser = async (email = 'nursandi@example.com') => {
  const adminRole = await prisma.roles.findFirst({
    where: {
      name: 'admin'
    }
  })

  await prisma.users.create({
    data: {
      name: 'Nursandi',
      email,
      password: await bcrypt.hash('123456', 10),
      roles: {
        connect: {
          id: adminRole.id
        }
      }
    }
  })
}

const removeTestUser = async (email = 'nursandi@example.com') => {
  await prisma.$transaction([
    prisma.campaigns.deleteMany({
      where: {
        users: {
          email
        }
      }
    }),
    prisma.users.deleteMany({
      where: {
        email
      }
    })
  ])
}

const getTestUser = async (
  email = 'nursandi@example.com',
  tokenExpiresIn = '1d'
) => {
  const user = await prisma.users.findFirst({
    where: {
      email
    },
    include: {
      roles: true
    }
  })

  const accessToken = jwt.sign({ user }, process.env.JWT_TOKEN, {
    expiresIn: tokenExpiresIn
  })

  return {
    ...user,
    access_token: accessToken
  }
}

export { createTestUser, removeTestUser, getTestUser }
