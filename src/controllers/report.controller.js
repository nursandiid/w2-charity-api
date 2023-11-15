import express from 'express'
import reportService from '../services/report.service.js'
import validate from '../validations/validation.js'
import { reportFiltersValidation } from '../validations/report.validate.js'
import successResponse from '../responses/success.response.js'
import fs from 'fs'

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const attributes = validate(reportFiltersValidation, req.query, true)
    const result = await reportService.getAll(attributes)

    return successResponse(res, result.data)
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
const exportPDF = async (req, res, next) => {
  try {
    const attributes = validate(reportFiltersValidation, req.query, true)
    const path = await reportService.exportPDF(attributes)

    res.status(200).download(path, (err) => {
      if (!err) fs.unlinkSync(path)
    })
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
const exportExcel = async (req, res, next) => {
  try {
    const attributes = validate(reportFiltersValidation, req.query, true)
    const path = await reportService.exportExcel(attributes)

    res.status(200).download(path, (err) => {
      if (!err) fs.unlinkSync(path)
    })
  } catch (error) {
    next(error)
  }
}

export default { getAll, exportPDF, exportExcel }
