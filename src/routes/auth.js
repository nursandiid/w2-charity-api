import express from 'express'
import authController from '../controllers/auth.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'

const authRouter = express.Router()

authRouter
  .post('/register', authController.register)
  .post('/login', authController.login)
  .get('/current', verifyToken, authController.get)
  .put('/current', verifyToken, authController.updateProfile)
  .put('/password', verifyToken, authController.updatePassword)

export default authRouter
