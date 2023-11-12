import express from 'express'
import reportService from '../services/report.service.js'
import validate from '../validations/validation.js'
import { reportFiltersValidation } from '../validations/report.validate.js'
import successResponse from '../responses/success.response.js'
import xlsx from 'node-xlsx'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

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
    const result = await reportService.exportPDF(attributes)

    return successResponse(res, null, 'Not available')
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
    const result = await reportService.exportExcel(attributes)

    const sheetOptions = {
      '!cols': [{ wch: 10 }, { wch: 25 }, { wch: 15 }, { wch: 15 }, { wch: 15 }]
    }

    const buffer = xlsx.build([{ name: 'Sheet0', data: result }], {
      sheetOptions
    })
    const path = `storage/${uuid()}.xlsx`

    fs.writeFileSync(path, buffer)

    res.status(200).download(path, (err) => {
      if (!err) fs.unlinkSync(path)
    })
  } catch (error) {
    next(error)
  }
}

export default { getAll, exportPDF, exportExcel }
