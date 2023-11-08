import Joi from 'joi'
import express from 'express'
import ErrorMsg from '../errors/message.error.js'
import errorResponse from '../responses/error.response.js'
import { Prisma } from '@prisma/client'
import fs from 'fs'
import logger from '../applications/logging.js'

/**
 *
 * @param {Joi.ValidationError|ErrorMsg|Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @returns
 */
const errorMiddleware = async (err, req, res, next) => {
  if (fs.existsSync(req.file?.path)) {
    fs.unlinkSync(req.file?.path)
  }

  if (err) logger.error(err.message)

  if (err instanceof Joi.ValidationError) {
    return errorResponse(
      res,
      err.details.map((detail) => {
        return {
          name: detail.context.label,
          message: detail.message?.replaceAll('"', '')
        }
      }),
      'Unprocessable Entities',
      422
    )
  } else if (err instanceof ErrorMsg) {
    return errorResponse(res, null, err.message, err.status)
  } else if (
    err instanceof Prisma.PrismaClientValidationError ||
    err instanceof Prisma.PrismaClientKnownRequestError ||
    err instanceof Prisma.PrismaClientUnknownRequestError
  ) {
    let message = err.message

    if (process.env.APP_ENV !== 'local') {
      message = `${err.message.split('\n')[1]} ${err.message.split('\n').pop()}`
    }

    return errorResponse(res, null, message, err.status || 500)
  } else if (err) {
    return errorResponse(res, null, err.message, err.status || 500)
  }

  next()
}

export default errorMiddleware
