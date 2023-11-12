import express from 'express'
import reportController from '../controllers/report.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import verifyRole from '../middleware/verify-role.middleware.js'

const reportRouter = express.Router()

reportRouter.use(verifyToken, verifyRole('admin'))

reportRouter
  .get('/', reportController.getAll)
  .get('/pdf', reportController.exportPDF)
  .get('/excel', reportController.exportExcel)

export default reportRouter
