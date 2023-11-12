import express from 'express'
import settingController from '../controllers/setting.controller.js'
import verifyToken from '../middleware/verify-token.middleware.js'
import verifyRole from '../middleware/verify-role.middleware.js'
import { multer, storage } from '../applications/multer.js'

const settingRouter = express.Router()
const uploadImages = multer({ storage: storage('setting') })
const fields = ['path_image', 'path_image_header', 'path_image_footer']

settingRouter.use(verifyToken, verifyRole('admin'))

settingRouter.get('/current', settingController.get).put(
  '/current',
  uploadImages.fields(
    fields.map((name) => ({
      name,
      maxCount: 1
    }))
  ),
  settingController.update
)

export default settingRouter
