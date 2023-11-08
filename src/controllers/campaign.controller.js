import express from 'express'
import validate from '../validations/validation.js'
import {
  campaignCreateValidation,
  campaignUpdateValidation,
  campaignIdValidation,
} from '../validations/campaign.validate.js'
import campaignService from '../services/campaign.service.js'
import successResponse from '../responses/success.response.js'
import { getFileUploadAttributes } from '../utils/helpers.js'

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
      path_image: getFileUploadAttributes(req.file),
    })
    attributes.user_id = req.user.id

    if (req.file?.path) {
      attributes.path_image = req.file.path
    }

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
const update = async (req, res, next) => {
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
const remove = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error)
  }
}

export default { getAll, create, get, update, remove }
