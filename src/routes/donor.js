import express from 'express'
import donorController from '../controllers/donor.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'

const donorRouter = express.Router()

donorRouter.use(verifyToken)

donorRouter.route('/').get(donorController.getAll).post(donorController.create)

donorRouter
  .route('/:id')
  .get(donorController.get)
  .put(donorController.update)
  .delete(donorController.remove)

export default donorRouter
