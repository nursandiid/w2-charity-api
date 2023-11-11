import express from 'express'
import validate from '../validations/validation.js'
import {
  donationCreateValidation,
  donationUpdateValidation,
  donationIdValidation,
  donationFiltersValidation
} from '../validations/donation.validate.js'
import donationService from '../services/donation.service.js'
import successResponse from '../responses/success.response.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const attributes = validate(donationFiltersValidation, req.query)
    const result = await donationService.getAll(attributes)

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
    const attributes = validate(donationCreateValidation, req.body)
    attributes.user_id = req.user.id

    const result = await donationService.create(attributes)

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
    const id = validate(donationIdValidation, req.params.id)
    const result = await donationService.get(id)

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
    const id = validate(donationIdValidation, req.params.id)
    const attributes = validate(donationUpdateValidation, req.body)
    const result = await donationService.update(id, attributes)

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
    const id = validate(donationIdValidation, req.params.id)
    const result = await donationService.remove(id)

    return successResponse(res, result, 'Deleted', 204)
  } catch (error) {
    next(error)
  }
}

export default { getAll, create, get, update, remove }
