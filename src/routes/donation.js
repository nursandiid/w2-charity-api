import express from 'express'
import donationController from '../controllers/donation.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import verifyRole from '../middleware/verify-role.middleware.js'

const donationRouter = express.Router()

donationRouter.use(verifyToken, verifyRole('admin', 'donor'))

donationRouter
  .route('/')
  .get(donationController.getAll)
  .post(donationController.create)

donationRouter
  .route('/:id')
  .get(donationController.get)
  .patch(donationController.update)
  .delete(donationController.remove)

export default donationRouter