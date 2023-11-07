import multer from 'multer'
import { v4 as uuid } from 'uuid'
import fs from 'fs'

const storage = (dir) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const path = `storage/uploads/${dir}`

      if (!fs.existsSync(path)) {
        createDir(path)
      }

      cb(null, path)
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split('.').pop()
      const filename = `${uuid()}.${ext}`

      cb(null, filename)
    },
  })
}

const createDir = (dirPath) => {
  const parts = dirPath.split('/')
  for (let i = 1; i <= parts.length; i++) {
    const currentPath = parts.slice(0, i).join('/')
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath)
    }
  }
}

export { multer, storage }
