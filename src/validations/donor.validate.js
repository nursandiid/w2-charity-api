import Joi from 'joi'

const fields = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  password_confirmation: Joi.string()
    .required()
    .min(6)
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'password_confirmation does not match'
    })
}

const donorCreateValidation = Joi.object({
  ...fields
})

const donorUpdateValidation = Joi.object({
  ...fields,
  password: Joi.string().optional().min(6),
  password_confirmation: Joi.string()
    .optional()
    .min(6)
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'password_confirmation does not match'
    })
})

const donorIdValidation = Joi.number().required().label('donor_id')

const donorFiltersValidation = Joi.object({
  keyword: Joi.string().optional().allow(''),
  size: Joi.number().optional().allow(''),
  page: Joi.number().optional().allow(''),
  sort_by: Joi.string()
    .valid('name', 'created_at', 'campaigns_total', 'donations_total')
    .optional()
    .allow(''),
  sort_value: Joi.string().valid('asc', 'desc').optional().allow('')
})

export {
  donorCreateValidation,
  donorUpdateValidation,
  donorIdValidation,
  donorFiltersValidation
}
