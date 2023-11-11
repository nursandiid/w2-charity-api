import express from 'express'
import ErrorMsg from '../errors/message.error.js'

/**
 * 
 * @param  {...any} roles 
 * @returns 
 */
const verifyRole = (...roles) => {
  /**
   *
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  return async (req, res, next) => {
    try {
      const currentRole = req.user.roles?.name
      if (!roles.includes(currentRole)) {
        throw new ErrorMsg(403, 'Forbidden')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}

export default verifyRole
