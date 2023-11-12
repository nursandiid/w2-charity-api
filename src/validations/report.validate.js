import Joi from 'joi'

const reportFiltersValidation = Joi.object({
  start_date: Joi.string()
    .optional()
    .allow('')
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'start_date format is invalid'
    }),
  end_date: Joi.string()
    .optional()
    .allow('')
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'end_date format is invalid'
    })
}).and('start_date', 'end_date')

export { reportFiltersValidation }
