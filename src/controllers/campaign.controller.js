import express from 'express'
import validate from '../validations/validation.js'
import {
  campaignCreateValidation,
  campaignUpdateValidation,
  campaignIdValidation
} from '../validations/campaign.validate.js'
import campaignService from '../services/campaign.service.js'
import successResponse from '../responses/success.response.js'
import { getFileUploadAttributes } from '../utils/helpers.js'
import fs from 'fs'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    //
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
const create = async (req, res, next) => {
  try {
    const attributes = validate(campaignCreateValidation, {
      ...req.body,
      path_image: getFileUploadAttributes(req.file)
    })
    attributes.user_id = req.user.id
    attributes.path_image = req.file.path

    const result = await campaignService.create(attributes)

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
    const id = validate(campaignIdValidation, req.params.id)
    const result = await campaignService.get(id)

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
    const id = validate(campaignIdValidation, req.params.id)
    const attributes = validate(campaignUpdateValidation, {
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

    const result = await campaignService.update(id, attributes)

    if (attributes.path_image && fs.existsSync(user.path_image)) {
      fs.unlinkSync(user.path_image)
    }

    return successResponse(res, result, 'Updated')
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
const remove = async (req, res, next) => {
  try {
    const id = validate(campaignIdValidation, req.params.id)
    const result = await campaignService.remove(id)

    if (fs.existsSync(req.user.path_image)) {
      fs.unlinkSync(req.user.path_image)
    }

    return successResponse(res, result, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

export default { getAll, create, get, update, remove }
