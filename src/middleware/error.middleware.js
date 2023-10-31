import Joi from 'joi'
import express from 'express'
import ErrorResponse from '../responses/error.response.js'

/**
 * 
 * @param {Joi.ValidationError|ErrorResponse|Error} err 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @returns 
 */
const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next()
    return
  }

  if (err instanceof Joi.ValidationError) {
    res
      .status(422)
      .json({
        message: 'Unprocessable Entities',
        errors: err.details.map((detail) => {
          return {
            name: detail.context.label,
            message: detail.message?.replaceAll('"', ''),
          }
        }),
      })
      .end()
  } else if (err instanceof ErrorResponse) {
    res
      .status(err.status)
      .json({
        message: err.message,
      })
      .end()
  } else {
    console.error(err)
    res
      .status(500)
      .json({
        message: err.message,
      })
      .end()
  }
}

export default errorMiddleware
