import express from 'express'
import paymentController from '../controllers/payment.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import verifyRole from '../middleware/verify-role.middleware.js'
import { multer, storage } from '../applications/multer.js'

const paymentRouter = express.Router()
const upload = multer({ storage: storage('payment') })

// paymentRouter.use(verifyToken, verifyRole('donor'))
paymentRouter.use(verifyToken)

paymentRouter
  .route('/:donationId/payment')
  .post(upload.single('path_image'), paymentController.create)
  .put(upload.single('path_image'), paymentController.update)
  .get(paymentController.get)

export default paymentRouter
