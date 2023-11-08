import slug from 'slug'

/**
 *
 * @param {object} req
 */
export const paginate = (req) => {
  // ? logic skip :
  // * 1 (page - 1) * size = 0
  // * 2 (page - 1) * size = 10

  const size = parseInt(req.size || 10)
  const page = parseInt(req.page || 1)
  const skip = (page - 1) * size

  return { size, page, skip }
}

/**
 *
 * @param {object} attributes
 * @returns
 */
export const paginateLink = (attributes) => {
  // ? logic from :
  // * page * size - (size - 1)
  // * 10 - 9 = 1
  // * page * size - (size - 1)
  // * 20 - 9 = 11

  const { data, size, page, total } = attributes
  return {
    data: data,
    per_page: size,
    current_page: page,
    last_page: Math.ceil((total || 1) / size),
    from: Math.ceil(page * size - (size - 1)),
    to: Math.ceil(page * size),
    total: total,
  }
}

/**
 *
 * @param {*} file
 * @returns
 */
export const getFileUploadAttributes = (file) => {
  if (!file) {
    return
  }

  return {
    size: file.size,
    extension: file.originalname.split('.').pop(),
    mimetype: file.mimetype,
  }
}

/**
 *
 * @param {string} string
 * @param {string} [separator="-"]
 * @returns {string}
 */
export const strSlug = (string, separator = '-') => {
  return slug(string, separator)
}

/**
 * Remove the selected properties of object and return them
 *
 * @param {object} obj
 * @param {array} props
 * @returns {array}
 */
export const deleteSelectedProperties = (obj, props = []) => {
  let deletedProps = []

  props.forEach((prop) => {
    deletedProps.push(obj[prop])
    delete obj[prop]
  })

  return deletedProps
}
