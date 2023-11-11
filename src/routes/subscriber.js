import express from 'express'
import subscriberController from '../controllers/subscriber.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import verifyRole from '../middleware/verify-role.middleware.js'

const subscriberRouter = express.Router()

subscriberRouter.use(verifyToken, verifyRole('admin'))

subscriberRouter
  .get('/', subscriberController.getAll)
  .delete('/:id', subscriberController.remove)

export default subscriberRouter
