import Joi from 'joi'

import i18n from '@Configs/i18n'

export const storeAdvertisingQuestionSchema = Joi.object({
  externalId: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: 'externalId' }),
    'any.required': i18n.__('required-field', { field: 'externalId' })
  }),
  content: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: i18n.__('advertising-question.fields.content') }),
    'any.required': i18n.__('required-field', { field: i18n.__('advertising-question.fields.content') })
  }),
}).options({ abortEarly: false })
