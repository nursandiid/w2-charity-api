import Joi from 'joi'

const contactCreateValidation = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
  message: Joi.string().required()
})

const contactIdValidation = Joi.number().required().label('contact_id')

const contactFiltersValidation = Joi.object({
  keyword: Joi.string().optional().allow(''),
  size: Joi.number().optional().allow(''),
  page: Joi.number().optional().allow(''),
  sort_by: Joi.string().valid('name', 'created_at').optional().allow(''),
  sort_value: Joi.string().valid('asc', 'desc').optional().allow('')
})

export {
  contactCreateValidation,
  contactIdValidation,
  contactFiltersValidation
}
