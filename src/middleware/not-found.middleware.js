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
const notFoundMiddleware = async (req, res) => {
  return errorResponse(res, null, 'Page not found', 404)
}

export default notFoundMiddleware