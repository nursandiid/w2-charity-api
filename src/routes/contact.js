import express from 'express'
import contactController from '../controllers/contact.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import verifyRole from '../middleware/verify-role.middleware.js'

const contactRouter = express.Router()

contactRouter.use(verifyToken, verifyRole('admin'))

contactRouter
  .get('/', contactController.getAll)
  .delete('/:id', contactController.remove)

export default contactRouter
