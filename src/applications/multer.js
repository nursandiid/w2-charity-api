import multer from 'multer'
import { v4 as uuid } from 'uuid'
import fs from 'fs'

class Multer {
  /**
   *
   * @param {string} folder
   * @param {array} ignoredMimeTypes
   */
  constructor(folder, ignoredMimeTypes) {
    this.folder = folder
    this.ignoredMimeTypes = ignoredMimeTypes
  }

  storage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        const path = `storage/uploads/${this.folder}`

        if (!fs.existsSync(path)) {
          this.createDir(path)
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

  filter() {
    return (req, file, cb) => {
      if (!this.ignoredMimeTypes.includes(file.mimetype)) {
        cb(`The field must be an image file`, false)
      }

      cb(null, true)
    }
  }

  /**
   *
   * @param {array} dirPath
   */
  createDir(dirPath) {
    const parts = dirPath.split('/')
    for (let i = 1; i <= parts.length; i++) {
      const currentPath = parts.slice(0, i).join('/')
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath)
      }
    }
  }
}

export default Multer
