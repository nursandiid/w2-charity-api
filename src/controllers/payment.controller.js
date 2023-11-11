import express from 'express'
import validate from '../validations/validation.js'
import {
  paymentCreateValidation,
  paymentUpdateValidation
} from '../validations/payment.validate.js'
import { donationIdValidation } from '../validations/donation.validate.js'
import paymentService from '../services/payment.service.js'
import successResponse from '../responses/success.response.js'
import { getFileUploadAttributes } from '../utils/helpers.js'
import fs from 'fs'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const create = async (req, res, next) => {
  try {
    const donationId = validate(donationIdValidation, req.params.donationId)
    const attributes = validate(paymentCreateValidation, {
      ...req.body,
      path_image: getFileUploadAttributes(req.file)
    })
    attributes.user_id = req.user.id
    attributes.path_image = req.file.path

    const result = await paymentService.create(attributes, donationId)

    return successResponse(res, result, 'Created', 201)
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const get = async (req, res, next) => {
  try {
    const donationId = validate(donationIdValidation, req.params.donationId)
    const result = await paymentService.get(donationId)

    return successResponse(res, result)
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const update = async (req, res, next) => {
  try {
    const donationId = validate(donationIdValidation, req.params.donationId)
    const attributes = validate(paymentUpdateValidation, {
      ...req.body,
      path_image: getFileUploadAttributes(req.file)
    })
    const user = req.user
    attributes.user_id = user.id

    if (req.file?.path) {
      attributes.path_image = req.file.path
    } else {
      delete attributes.path_image
    }

    const result = await paymentService.update(attributes, donationId)

    if (attributes.path_image && fs.existsSync(user.path_image)) {
      fs.unlinkSync(user.path_image)
    }

    return successResponse(res, result, 'Updated')
  } catch (error) {
    next(error)
  }
}

export default { create, get, update }
