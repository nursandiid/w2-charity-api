import Joi from 'joi'
import express from 'express'
import ErrorMsg from '../errors/message.error.js'
import errorResponse from '../responses/error.response.js'

/**
 *
 * @param {Joi.ValidationError|ErrorMsg|Error} err
 * @param {express.Request} req
 * @param {express.Response} res
 *
 * @returns
 */
const errorMiddleware = async (err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    return errorResponse(
      res,
      err.details.map((detail) => {
        return {
          name: detail.context.label,
          message: detail.message?.replaceAll('"', ''),
        }
      }),
      'Unprocessable Entities',
      422
    )
  } else if (err instanceof ErrorMsg) {
    return errorResponse(res, null, err.message, err.status)
  } else if (err) {
    console.error(err)

    return errorResponse(res, null, err.message, err.status || 500)
  }

  next()
}

export default errorMiddleware
