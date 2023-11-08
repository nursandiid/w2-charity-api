import express from 'express'
import validate from '../validations/validation.js'
import {
  categoryCreateValidation,
  categoryUpdateValidation,
  categoryIdValidation,
  categoryFiltersValidation
} from '../validations/category.validate.js'
import categoryService from '../services/category.service.js'
import successResponse from '../responses/success.response.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const attributes = validate(categoryFiltersValidation, req.query, true)
    const result = await categoryService.getAll(attributes)

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
    const attributes = validate(categoryCreateValidation, req.body)
    const result = await categoryService.create(attributes)

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
    const id = validate(categoryIdValidation, req.params.id)
    const result = await categoryService.get(id)

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
    const attributes = validate(categoryUpdateValidation, req.body)
    const id = validate(categoryIdValidation, req.params.id)
    const result = await categoryService.update(id, attributes)

    return successResponse(res, result, 'Updated', 200)
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
    const id = validate(categoryIdValidation, req.params.id)
    const result = await categoryService.remove(id)

    return successResponse(res, result, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

export default { getAll, create, get, update, remove }
