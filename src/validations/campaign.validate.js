import Joi from 'joi'

const fields = {
  title: Joi.string().required(),
  short_description: Joi.string().optional(),
  body: Joi.string().required(),
  category_ids: Joi.array().items(Joi.number().required()),
  status: Joi.string().optional().valid('publish', 'archived'),
  goal: Joi.number().required(),
  end_date: Joi.string()
    .optional()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'end_date format is not valid',
    }),
  note: Joi.string().optional(),
  receiver: Joi.string()
    .required()
    .valid(
      'Saya Sendiri',
      'Keluarga / Kerabat',
      'Organisasi / Lembaga',
      'Lainnya'
    ),
  publish_date: Joi.string()
    .optional()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .messages({
      'string.pattern.base': 'publish_date format is not valid',
    }),
  path_image: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//),
  }).required(),
}

const campaignCreateValidation = Joi.object({
  ...fields,
})

const campaignUpdateValidation = Joi.object({
  ...fields,
  body: Joi.string().optional(),
  goal: Joi.number().optional(),
  receiver: Joi.string()
    .optional()
    .valid(
      'Saya Sendiri',
      'Keluarga / Kerabat',
      'Organisasi / Lembaga',
      'Lainnya'
    ),
  path_image: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//),
  }).optional(),
})

const campaignIdValidation = Joi.number()

export {
  campaignCreateValidation,
  campaignUpdateValidation,
  campaignIdValidation,
}
