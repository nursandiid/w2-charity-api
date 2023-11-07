import express from 'express'
import authController from '../controllers/auth.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import { multer, storage } from '../applications/multer.js'

const authRouter = express.Router()
const imageUpload = multer({ storage: storage('user') })

authRouter
  .post('/register', authController.register)
  .post('/login', authController.login)
  .get('/current', verifyToken, authController.get)
  .put(
    '/current',
    imageUpload.single('path_image'),
    verifyToken,
    authController.updateProfile
  )
  .patch('/password', verifyToken, authController.updatePassword)

export default authRouter
