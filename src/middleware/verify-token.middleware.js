import express from 'express'
import jwt from 'jsonwebtoken'
import ErrorMsg from '../errors/message.error.js'
import { getAuth } from '../services/auth.service.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(' ').pop()
    if (!accessToken) {
      throw new ErrorMsg(401, 'Unauthorized')
    }

    jwt.verify(accessToken, process.env.JWT_TOKEN, async (err, decoded) => {
      try {
        if (err) {
          if (
            err.name === 'JsonWebTokenError' &&
            err.message === 'jwt malformed'
          ) {
            throw new ErrorMsg(401, 'Invalid token format')
          } else if (
            err.name === 'TokenExpiredError' &&
            err.message === 'jwt expired'
          ) {
            throw new ErrorMsg(401, 'Token is expired')
          }

          throw new ErrorMsg(401, 'Unauthorized')
        }

        req.user = await getAuth(decoded.user.id)
        next()
      } catch (error) {
        next(error)
      }
    })
  } catch (error) {
    next(error)
  }
}

export default verifyToken
