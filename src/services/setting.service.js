import prisma from '../applications/database.js'
import ErrorMsg from '../errors/message.error.js'
import fs from 'fs'

/**
 *
 * @returns {object}
 */
const get = async () => {
  const setting = await prisma.settings.findFirst()
  if (!setting) {
    throw new ErrorMsg(404, 'Setting not found')
  }

  return setting
}

/**
 *
 * @param {*} attributes
 * @returns {object}
 */
const update = async (attributes) => {
  let setting = await prisma.settings.findFirst()
  if (!setting) {
    throw new ErrorMsg(404, 'Setting not found')
  }

  const settingUpdated = await prisma.settings.update({
    where: {
      id: setting.id
    },
    data: attributes
  })

  let files = ['path_image', 'path_image_header', 'path_image_footer']
  files.forEach((file) => {
    if (attributes[file] && fs.existsSync(setting[file])) {
      fs.unlinkSync(setting[file])
    }
  })

  return settingUpdated
}

export default { get, update }
