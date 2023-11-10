import express from 'express'
import subscriberService from '../services/subscriber.service.js'
import validate from '../validations/validation.js'
import {
  subscriberCreateValidation,
  subscriberFiltersValidation,
  subscriberIdValidation
} from '../validations/subscriber.validate.js'
import successResponse from '../responses/success.response.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const attributes = validate(subscriberFiltersValidation, req.query)
    const result = await subscriberService.getAll(attributes)

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
const create = async (req, res, next) => {
  try {
    const attributes = validate(subscriberCreateValidation, req.body)
    const result = await subscriberService.create(attributes)

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
const remove = async (req, res, next) => {
  try {
    const id = validate(subscriberIdValidation, req.params.id)
    const result = await subscriberService.remove(id)

    return successResponse(res, result, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

export default { getAll, create, remove }
