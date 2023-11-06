import express from 'express'
import categoryController from '../controllers/category.controller.js'

const categoryRouter = express.Router()

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