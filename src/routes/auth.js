import express from 'express'
import authController from '../controllers/auth.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import { multer, storage } from '../applications/multer.js'

const authRouter = express.Router()
const imageUpload = multer({ storage: storage('user') })

authRouter
  .post('/register', authController.register)
  .post('/login', authController.login)

authRouter
  .use(verifyToken)
  .route('/current')
  .get(authController.get)
  .put(imageUpload.single('path_image'), authController.updateProfile)

authRouter.patch('/password', verifyToken, authController.updatePassword)

export default authRouter
