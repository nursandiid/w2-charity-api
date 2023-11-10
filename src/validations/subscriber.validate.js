import Joi from 'joi'

const subscriberCreateValidation = Joi.object({
  email: Joi.string().email().required(),
})

const subscriberIdValidation = Joi.number().required().label('subscriber_id')

const subscriberFiltersValidation = Joi.object({
  keyword: Joi.string().optional().allow(''),
  size: Joi.number().optional().allow(''),
  page: Joi.number().optional().allow(''),
  sort_by: Joi.string().valid('email', 'created_at').optional().allow(''),
  sort_value: Joi.string().valid('asc', 'desc').optional().allow('')
})

export {
  subscriberCreateValidation,
  subscriberIdValidation,
  subscriberFiltersValidation
}
