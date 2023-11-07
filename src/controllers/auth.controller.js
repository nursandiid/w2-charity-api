import express from 'express'
import validate from '../validations/validation.js'
import authService from '../services/auth.service.js'
import {
  authRegisterValidation,
  authLoginValidation,
} from '../validations/auth.validate.js'
import successResponse from '../responses/success.response.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const register = async (req, res, next) => {
  try {
    const attributes = validate(authRegisterValidation, req.body)
    const result = await authService.register(attributes)

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
const login = async (req, res, next) => {
  try {
    const attributes = validate(authLoginValidation, req.body)
    const result = await authService.login(attributes)

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
const get = async (req, res, next) => {
  try {
    return successResponse(res, req.user)
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
const updateProfile = async (req, res, next) => {
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
const updatePassword = async (req, res, next) => {
  try {
    //
  } catch (error) {
    next(error)
  }
}

export default { register, login, get, updateProfile, updatePassword }
