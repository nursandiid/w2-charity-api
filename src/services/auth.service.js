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
  let user = await prisma.users.findFirst({
    where: {
      email: attributes.email,
    },
  })

  const passwordIsValid = await bcrypt.compare(
    attributes.password,
    user.password || ''
  )

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

  return user
}

/**
 *
 * @param {*} attributes
 * @param {number} id
 * @returns {object}
 */
const updateProfile = async (attributes, id) => {
  //
}

/**
 *
 * @param {*} attributes
 * @param {number} id
 * @returns {object}
 */
const updatePassword = async (attributes, id) => {
  //
}

export { get as getAuth }

export default { register, login, get, updateProfile, updatePassword }
