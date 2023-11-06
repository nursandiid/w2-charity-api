import multer from 'multer'
import Multer from '../applications/multer.js'

let upload = new Multer('campaign', ['image/jpeg', 'image/png', 'image/jpg'])

const uploadImage = multer({
  storage: upload.storage(),
  fileFilter: upload.filter(),
})

export { uploadImage }
