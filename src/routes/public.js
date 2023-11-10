import express from 'express'
import contactController from '../controllers/contact.controller.js'

const publicRouter = express.Router()

publicRouter.post('/contacts', contactController.create)

export default publicRouter
