import Joi from 'joi'

import i18n from '@Configs/i18n'

export const storeAdvertisingSchema = Joi.object({
  externalId: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: 'externalId' }),
    'any.required': i18n.__('required-field', { field: 'externalId' })
  }),
  price: Joi.number().required().min(1).messages({
    'number.empty': i18n.__('empty-field', { field: i18n.__('advertising.fields.price') }),
    'any.required': i18n.__('required-field', { field: i18n.__('advertising.fields.price') }),
    'number.min': i18n.__('advertising.errors.invalid-price')
  })
}).options({ abortEarly: false })

export const updateAdvertisingSchema = Joi.object({
  price: Joi.number().required().min(1).messages({
    'number.empty': i18n.__('empty-field', { field: i18n.__('advertising.fields.price') }),
    'any.required': i18n.__('required-field', { field: i18n.__('advertising.fields.price') }),
    'number.min': i18n.__('advertising.errors.invalid-price')
  }),
  finished: Joi.bool(),
}).options({ abortEarly: false })
