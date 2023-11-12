import Joi from 'joi'

const cashoutCreateValidation = Joi.object({
  campaign_id: Joi.number().required(),
  cashout_amount: Joi.number().required(),
  bank_id: Joi.number().required()
})

const cashoutUpdateValidation = Joi.object({
  campaign_id: Joi.number().required(),
  status: Joi.string().valid('success', 'rejected', 'canceled').required(),
  reason_rejected: Joi.string().when('status', {
    is: 'rejected',
    then: Joi.required(),
    otherwise: Joi.optional()
  })
})

const cashoutIdValidation = Joi.number().required().label('cashout_id')

const cashoutFiltersValidation = Joi.object({
  keyword: Joi.string().optional().allow(''),
  size: Joi.number().optional().allow(''),
  page: Joi.number().optional().allow(''),
  sort_by: Joi.string().valid('name').optional().allow(''),
  sort_value: Joi.string().valid('asc', 'desc').optional().allow(''),
  status: Joi.string()
    .valid('pending', 'success', 'rejected', 'canceled')
    .allow('')
})

export {
  cashoutCreateValidation,
  cashoutUpdateValidation,
  cashoutIdValidation,
  cashoutFiltersValidation
}
