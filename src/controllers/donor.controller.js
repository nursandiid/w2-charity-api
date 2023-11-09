import express from 'express'
import validate from '../validations/validation.js'
import successResponse from '../responses/success.response.js'
import {
  donorCreateValidation,
  donorUpdateValidation,
  donorIdValidation,
  donorFiltersValidation
} from '../validations/donor.validate.js'
import donorService from '../services/donor.service.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const attributes = validate(donorFiltersValidation, req.query)
    const result = await donorService.getAll(attributes)

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
    const attributes = validate(donorCreateValidation, req.body)
    const result = await donorService.create(attributes)

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
    const id = validate(donorIdValidation, req.params.id)
    const result = await donorService.get(id)

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
    const id = validate(donorIdValidation, req.params.id)
    const attributes = validate(donorUpdateValidation, req.body)
    const result = await donorService.update(id, attributes)

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
    const id = validate(donorIdValidation, req.params.id)
    const result = await donorService.remove(id)

    return successResponse(res, result, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

export default { getAll, create, get, update, remove }
