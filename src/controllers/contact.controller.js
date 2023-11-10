import express from 'express'
import contactService from '../services/contact.service.js'
import validate from '../validations/validation.js'
import {
  contactCreateValidation,
  contactFiltersValidation,
  contactIdValidation
} from '../validations/contact.validate.js'
import successResponse from '../responses/success.response.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const attributes = validate(contactFiltersValidation, req.query)
    const result = await contactService.getAll(attributes)

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
    const attributes = validate(contactCreateValidation, req.body)
    const result = await contactService.create(attributes)

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
    const id = validate(contactIdValidation, req.params.id)
    const result = await contactService.remove(id)

    return successResponse(res, result, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

export default { getAll, create, remove }
