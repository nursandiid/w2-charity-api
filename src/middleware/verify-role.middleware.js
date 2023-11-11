import express from 'express'
import ErrorMsg from '../errors/message.error.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const verifyRole = (role) => {
  return async (req, res, next) => {
    try {
      const currentRole = req.user.roles?.name
      if (currentRole !== role) {
        throw new ErrorMsg(403, 'Forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default verifyRole
