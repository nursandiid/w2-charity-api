import express from 'express'

/**
 *
 * @param {express.Response} res
 * @param {array|null} errors
 * @param {string} message
 * @param {number} status
 * @returns
 */
const errorResponse = (
  res,
  errors = null,
  message = 'Failed',
  status = 400
) => {
  const attributes = {
    errors,
    message,
  }

  if (!attributes.errors) {
    delete attributes.errors
  }

  return res.status(status).json(attributes).end()
}

export default errorResponse