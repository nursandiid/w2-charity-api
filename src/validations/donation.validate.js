import Joi from 'joi'

const donationCreateValidation = Joi.object({
  campaign_id: Joi.number().required(),
  anonim: Joi.number().valid(1, 0).optional(),
  nominal: Joi.number().required(),
  support: Joi.string().optional().allow('')
})

const donationUpdateValidation = Joi.object({
  campaign_id: Joi.number().required(),
  status: Joi.string().valid('confirmed').required()
})

const donationIdValidation = Joi.number().required().label('donation_id')

const donationFiltersValidation = Joi.object({
  keyword: Joi.string().optional().allow(''),
  size: Joi.number().optional().allow(''),
  page: Joi.number().optional().allow(''),
  sort_by: Joi.string()
    .valid('title', 'nominal', 'status', 'created_at', 'donor')
    .optional()
    .allow(''),
  sort_value: Joi.string().valid('asc', 'desc').optional().allow(''),
  status: Joi.string()
    .valid('confirmed', 'not confirmed', 'canceled')
    .optional()
    .allow('')
})

export {
  donationCreateValidation,
  donationUpdateValidation,
  donationIdValidation,
  donationFiltersValidation
}
