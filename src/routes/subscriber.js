import express from 'express'
import subscriberController from '../controllers/subscriber.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'

const subscriberRouter = express.Router()

subscriberRouter
  .get('/', verifyToken, subscriberController.getAll)
  .delete('/:id', verifyToken, subscriberController.remove)

export default subscriberRouter
