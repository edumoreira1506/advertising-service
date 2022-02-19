import Joi from 'joi'

import i18n from '@Configs/i18n'

export const storeAdvertisingFavoriteSchema = Joi.object({
  externalId: Joi.string().required().messages({
    'string.empty': i18n.__('empty-field', { field: 'externalId' }),
    'any.required': i18n.__('required-field', { field: 'externalId' })
  }),
}).options({ abortEarly: false })
