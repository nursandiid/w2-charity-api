import express from 'express'
import cashoutController from '../controllers/cashout.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import verifyRole from '../middleware/verify-role.middleware.js'

const cashoutRouter = express.Router()

cashoutRouter.use(verifyToken, verifyRole('admin', 'donor'))

cashoutRouter
  .route('/')
  .get(cashoutController.getAll)
  .post(cashoutController.create)

cashoutRouter
  .route('/:id')
  .get(cashoutController.get)
  .patch(cashoutController.update)
  .delete(cashoutController.remove)

export default cashoutRouter