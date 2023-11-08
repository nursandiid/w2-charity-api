import express from 'express'
import campaignController from '../controllers/campaign.controller.js'
import { multer, storage } from '../applications/multer.js'
import verifyToken from '../middleware/verify-token.middleware.js'

const campaignRouter = express.Router()
const imageUpload = multer({ storage: storage('campaign') })

campaignRouter.use(verifyToken)

campaignRouter
  .route('/')
  .get(campaignController.getAll)
  .post(imageUpload.single('path_image'), campaignController.create)

campaignRouter
  .route('/:id')
  .get(campaignController.get)
  .put(imageUpload.single('path_image'), campaignController.update)
  .delete(campaignController.remove)

export default campaignRouter
