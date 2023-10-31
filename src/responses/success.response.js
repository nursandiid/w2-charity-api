import express from 'express'

/**
 *
 * @param {express.Response} res
 * @param {array} data
 * @param {string} message
 * @param {number} status
 * @returns
 */
const successResponse = (res, data = [], message = 'Success', status = 200) => {
  return res
    .status(status)
    .json({
      data,
      message,
    })
    .end()
}

export default successResponse
