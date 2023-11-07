import Joi from 'joi'

const authRegisterValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  password_confirmation: Joi.string()
    .required()
    .min(6)
    .valid(Joi.ref('password'))
    .messages({
      'any.only': "password_confiramtion doesn't match",
    }),
})

const authLoginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const authUpdateProfileValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional().allow(''),
  gender: Joi.string().optional().allow('').valid('laki-laki', 'perempuan'),
  birth_date: Joi.string()
    .optional()
    .allow('')
    .pattern(new RegExp(/^\d(4)-\d(2)-\d(2)$/)),
  job: Joi.string().optional().allow(''),
  address: Joi.string().optional().allow(''),
  about: Joi.string().optional().allow(''),
})

const authUpdatePasswordValidation = Joi.object({})

export {
  authRegisterValidation,
  authLoginValidation,
  authUpdateProfileValidation,
  authUpdatePasswordValidation,
}
