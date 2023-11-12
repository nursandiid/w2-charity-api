import express from 'express'
import cashoutService from '../services/cashout.service.js'
import validate from '../validations/validation.js'
import {
  cashoutCreateValidation,
  cashoutUpdateValidation,
  cashoutIdValidation,
  cashoutFiltersValidation
} from '../validations/cashout.validate.js'
import successResponse from '../responses/success.response.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const attributes = validate(cashoutFiltersValidation, req.query, true)
    const result = await cashoutService.getAll(attributes)

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
    const attributes = validate(cashoutCreateValidation, req.body)
    attributes.user_id = req.user.id
    
    const result = await cashoutService.create(attributes)

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
    const id = validate(cashoutIdValidation, req.params.id)
    const result = await cashoutService.get(id)

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
    const id = validate(cashoutIdValidation, req.params.id)
    const attributes = validate(cashoutUpdateValidation, req.body)
    const result = await cashoutService.update(id, attributes)

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
    const id = validate(cashoutIdValidation, req.params.id)
    const result = await cashoutService.remove(id)

    return successResponse(res, result, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

export default { getAll, create, get, update, remove }
