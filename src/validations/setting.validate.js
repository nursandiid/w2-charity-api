import Joi from 'joi'

const settingUpdateValidation = Joi.object({
  owner_name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  company_name: Joi.string().required(),
  short_description: Joi.string().required(),
  keyword: Joi.string().required(),
  phone_hours: Joi.string().required(),
  about: Joi.string().optional(),
  address: Joi.string().optional(),
  postal_code: Joi.string().optional(),
  city: Joi.string().optional(),
  province: Joi.string().optional(),
  path_image: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//)
  }).optional(),
  path_image_header: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//)
  }).optional(),
  path_image_footer: Joi.object({
    size: Joi.number().max(2_048_000),
    extension: Joi.string().valid('png', 'jpg', 'jpeg'),
    mimetype: Joi.string().regex(/^image\//)
  }).optional(),
  instagram_link: Joi.string().required(),
  twitter_link: Joi.string().required(),
  fanpage_link: Joi.string().required(),
  google_plus_link: Joi.string().required()
})

export { settingUpdateValidation }
