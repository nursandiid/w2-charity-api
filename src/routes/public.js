import express from 'express'
import contactController from '../controllers/contact.controller.js'
import subscriberController from '../controllers/subscriber.controller.js'

const publicRouter = express.Router()

publicRouter.post('/contacts', contactController.create)
publicRouter.post('/subscribers', subscriberController.create)

export default publicRouter
