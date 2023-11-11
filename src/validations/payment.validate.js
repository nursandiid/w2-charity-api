import Joi from 'joi'

const fields = {
  name: Joi.string().required(),
  nominal: Joi.number().required(),
  bank_id: Joi.number().required(),
  note: Joi.string().optional(),
  path_image: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//)
  }).required()
}

const paymentCreateValidation = Joi.object(fields)

const paymentUpdateValidation = Joi.object({
  ...fields,
  path_image: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//)
  }).optional()
})

export { paymentCreateValidation, paymentUpdateValidation }
