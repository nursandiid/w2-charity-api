import express from 'express'
import contactController from '../controllers/contact.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'

const contactRouter = express.Router()

contactRouter
  .get('/', verifyToken, contactController.getAll)
  .delete('/:id', verifyToken, contactController.remove)

export default contactRouter
