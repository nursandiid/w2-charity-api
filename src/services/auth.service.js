import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const register = async (attributes) => {
  let user = await prisma.users.findFirst({
    where: {
      email: attributes.email,
    },
  })

  if (user) {
    throw new ErrorMsg(400, 'User already exists')
  }

  const donorRole = await prisma.roles.findFirst({
    where: {
      name: 'donor',
    },
  })

  user = await prisma.users.create({
    data: {
      name: attributes.name,
      email: attributes.email,
      password: await bcrypt.hash(attributes.password, 10),
      role_id: donorRole.id,
    },
  })

  return user
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const login = async (attributes) => {
  const user = await prisma.users.findFirst({
    where: {
      email: attributes.email,
    },
  })

  const passwordIsValid =
    user.password && (await bcrypt.compare(attributes.password, user.password))

  if (!user || !passwordIsValid) {
    throw new ErrorMsg(401, 'Email or password is wrong')
  }

  const accessToken = jwt.sign({ user }, process.env.JWT_TOKEN, {
    expiresIn: '1d',
  })

  return {
    ...user,
    access_token: accessToken,
  }
}

/**
 *
 * @param {number} id
 * @returns {object}
 */
const get = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
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
const updateProfile = async (id, attributes) => {
  let user = await prisma.users.findFirst({
    where: {
      id,
    },
  })

  if (!user) {
    throw new ErrorMsg(404, 'User not found')
  }

  delete attributes.email

  user = await prisma.users.update({
    where: {
      id,
    },
    data: attributes,
  })

  return user
}

/**
 *
 * @param {number} id
 * @param {*} attributes
 * @returns {object}
 */
const updatePassword = async (id, attributes) => {
  let user = await prisma.users.findFirst({
    where: {
      id,
    },
  })

  if (!user) {
    throw new ErrorMsg(404, 'User not found')
  }

  const checkCurrentPassword = await bcrypt.compare(
    attributes.current_password,
    user.password
  )

  if (!checkCurrentPassword) {
    throw new ErrorMsg(400, 'Current password does not match')
  }

  user = await prisma.users.update({
    where: {
      id,
    },
    data: {
      password: await bcrypt.hash(attributes.password, 10),
    },
  })

  return user
}

export { get as getAuth }

export default { register, login, get, updateProfile, updatePassword }
