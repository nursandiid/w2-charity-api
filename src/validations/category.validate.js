import Joi from 'joi'

const categoryCreateValidation = Joi.object({
  name: Joi.string().required()
})

const categoryUpdateValidation = Joi.object({
  name: Joi.string().required()
})

const categoryIdValidation = Joi.number().required().label('category_id')

const categoryFiltersValidation = Joi.object({
  keyword: Joi.string().optional().allow(''),
  size: Joi.number().optional().allow(''),
  page: Joi.number().optional().allow(''),
  sort_by: Joi.string().valid('name').optional().allow(''),
  sort_value: Joi.string().valid('asc', 'desc').optional().allow('')
})

export {
  categoryCreateValidation,
  categoryUpdateValidation,
  categoryIdValidation,
  categoryFiltersValidation
}
