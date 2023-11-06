import Joi from 'joi'

/**
 *
 * @param {Joi.Schema} schema
 * @param {*} request
 * @returns
 */
const validate = (schema, request, stripUnknown = false) => {
  const validated = schema.validate(request, {
    abortEarly: false,
    stripUnknown,
  })

  if (validated.error) {
    throw new Joi.ValidationError(
      validated.error.message,
      validated.error.details
    )
  }

  return validated.value
}

export default validate
