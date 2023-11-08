import express from 'express'
import categoryController from '../controllers/category.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'

const categoryRouter = express.Router()

categoryRouter.use(verifyToken)

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
