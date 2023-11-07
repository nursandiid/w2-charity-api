import express from 'express'
import fs from 'fs'
import validate from '../validations/validation.js'
import authService from '../services/auth.service.js'
import {
  authRegisterValidation,
  authLoginValidation,
  authUpdateProfileValidation,
  authUpdatePasswordValidation,
} from '../validations/auth.validate.js'
import successResponse from '../responses/success.response.js'
import { getFileUploadAttributes } from '../utils/helpers.js'

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
    const attributes = validate(authUpdateProfileValidation, {
      ...req.body,
      path_image: getFileUploadAttributes(req.file),
    })
    const user = req.user

    if (req.file?.path) {
      attributes.path_image = req.file.path
    } else {
      delete attributes.path_image
    }

    if (attributes.birth_date) {
      attributes.birth_date = new Date(attributes.birth_date)
    }

    const result = await authService.updateProfile(attributes, user.id)

    if (attributes.path_image && fs.existsSync(user.path_image)) {
      fs.unlinkSync(user.path_image)
    }

    return successResponse(res, result, 'Updated')
  } catch (error) {
    if (fs.existsSync(req.file?.path)) {
      fs.unlinkSync(req.file?.path)
    }

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
    const attributes = validate(authUpdatePasswordValidation, req.body)
    const result = await authService.updatePassword(attributes, req.user.id)

    return successResponse(res, result, 'Updated')
  } catch (error) {
    next(error)
  }
}

export default { register, login, get, updateProfile, updatePassword }
