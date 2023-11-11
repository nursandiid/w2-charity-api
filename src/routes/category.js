import express from 'express'
import categoryController from '../controllers/category.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import verifyRole from '../middleware/verify-role.middleware.js'

const categoryRouter = express.Router()

categoryRouter.use(verifyToken, verifyRole('admin'))

categoryRouter
  .route('/')
  .get(categoryController.getAll)
  .post(categoryController.create)

categoryRouter
  .route('/:id')
  .get(categoryController.get)
  .put(categoryController.update)
  .delete(categoryController.remove)

export default categoryRouter
