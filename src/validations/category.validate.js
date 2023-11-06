import Joi from 'joi'

const createValidation = Joi.object({
  name: Joi.string().required(),
})

const updateValidation = Joi.object({
  name: Joi.string().required(),
})

const getValidation = Joi.number()

const queryFiltersValidation = Joi.object({
  keyword: Joi.string().optional().allow(''),
  rows: Joi.number().optional().allow(''),
  paginate: Joi.number().optional().allow(''),
  sort_by: Joi.string().valid('name').optional().allow(''),
  sort_value: Joi.string().valid('asc', 'desc').optional().allow(''),
})

export default {
  createValidation,
  updateValidation,
  getValidation,
  queryFiltersValidation,
}
