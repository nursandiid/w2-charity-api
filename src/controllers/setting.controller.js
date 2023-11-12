import express from 'express'
import settingService from '../services/setting.service.js'
import validate from '../validations/validation.js'
import { settingUpdateValidation } from '../validations/setting.validate.js'
import successResponse from '../responses/success.response.js'
import { getFileUploadAttributes } from '../utils/helpers.js'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const get = async (req, res, next) => {
  try {
    const result = await settingService.get()

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
    const files = {
      path_image:
        req.files && req.files['path_image']
          ? req.files['path_image'][0]
          : null,
      path_image_header:
        req.files && req.files['path_image_header']
          ? req.files['path_image_header'][0]
          : null,
      path_image_footer:
        req.files && req.files['path_image_footer']
          ? req.files['path_image_footer'][0]
          : null
    }

    let attributes = validate(settingUpdateValidation, {
      ...req.body,
      path_image: getFileUploadAttributes(files.path_image),
      path_image_header: getFileUploadAttributes(files.path_image_header),
      path_image_footer: getFileUploadAttributes(files.path_image_footer)
    })

    for (const file in files) {
      if (files[file]) {
        attributes = {
          ...attributes,
          [file]: files[file].path
        }
      } else {
        delete attributes[file]
      }
    }

    const result = await settingService.update(attributes)

    return successResponse(res, result, 'Updated')
  } catch (error) {
    next(error)
  }
}

export default { get, update }
