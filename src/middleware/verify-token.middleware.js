import express from 'express'
import jwt from 'jsonwebtoken'
import ErrorMsg from '../errors/message.error.js'
import { getAuth } from '../services/auth.service.js'
import errorResponse from '../responses/error.response.js'

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
      if (err) {
        if (
          err.name === 'JsonWebTokenError' &&
          err.message === 'jwt malformed'
        ) {
          return errorResponse(res, null, 'Invalid token format', 401)
        } else if (
          err.name === 'TokenExpiredError' &&
          err.message === 'jwt expired'
        ) {
          return errorResponse(res, null, 'Token is expired', 401)
        }

        return errorResponse(res, null, 'Unauthorized', 401)
      }

      req.user = await getAuth(decoded.user.id)
      next()
    })
  } catch (error) {
    next(error)
  }
}

export default verifyToken
