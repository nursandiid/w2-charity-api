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
      'any.only': 'password_confirmation does not match',
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
  gender: Joi.string().optional().allow('').valid('laki_laki', 'perempuan'),
  birth_date: Joi.string()
    .optional()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'date format is not valid',
    }),
  job: Joi.string().optional().allow(''),
  address: Joi.string().optional().allow(''),
  about: Joi.string().optional().allow(''),
  path_image: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//),
  }).optional(),
})

const authUpdatePasswordValidation = Joi.object({
  current_password: Joi.string().required(),
  password: Joi.string().required(),
  password_confirmation: Joi.string()
    .required()
    .min(6)
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'password_confirmation does not match',
    }),
})

export {
  authRegisterValidation,
  authLoginValidation,
  authUpdateProfileValidation,
  authUpdatePasswordValidation,
}
