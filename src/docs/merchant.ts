import { createDoc } from '@cig-platform/docs'
import { storeAdvertisingFavoriteSchema } from '@Schemas/AdvertisingFavoriteSchemas'
import { storeAdvertisingQuestionSchema } from '@Schemas/AdvertisingQuestionSchemas'
import { storeAdvertisingSchema, updateAdvertisingSchema } from '@Schemas/AdvertisingSchemas'
import { storeMerchantSchema } from '@Schemas/MerchantSchemas'

const merchantDocs = {
  ...createDoc('/merchants', ['Merchant'], [
    {
      method: 'post',
      title: 'Register merchant',
      description: 'Register merchant endpoint',
      objectSchema: storeMerchantSchema
    },
    {
      method: 'get',
      title: 'Get merchants',
      description: 'Search merchants endpoint',
      queryParams: [{ type: 'string', name: 'externalId' }]
    }
  ]),
  ...createDoc('/merchants/{merchantId}/rollback', ['Merchant'], [
    {
      method: 'post',
      title: 'Rollback merchant register',
      description: 'Register merchant endpoint',
    },
  ], {
    pathVariables: [{ type: 'string', name: 'merchantId' }]
  }),
  ...createDoc('/merchants/{merchantId}', ['Merchant'], [
    {
      method: 'get',
      title: 'Get merchant',
      description: 'Get merchant endpoint',
    },
  ], {
    pathVariables: [{ type: 'string', name: 'merchantId' }]
  }),
  ...createDoc('/merchants/{merchantId}/advertisings', ['Advertising'], [
    {
      method: 'post',
      title: 'Register advertising',
      description: 'Register advertising endpoint',
      objectSchema: storeAdvertisingSchema
    },
    {
      method: 'get',
      title: 'Get advertisings',
      description: 'Get advertisings endpoint',
      queryParams: [{ type: 'string', name: 'externalId' }]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'merchantId' }]
  }),
  ...createDoc('/advertisings', ['Advertising'], [
    {
      method: 'get',
      title: 'Search advertisings',
      description: 'Get advertisings endpoint',
      queryParams: [
        { type: 'string', name: 'advertisingIds' },
        { type: 'string', name: 'sort' },
        { type: 'string', name: 'gender' },
        { type: 'string', name: 'type' },
        { type: 'string', name: 'tail' },
        { type: 'string', name: 'dewlap' },
        { type: 'string', name: 'crest' },
        { type: 'string', name: 'description' },
        { type: 'string', name: 'name' },
        { type: 'string', name: 'genderCategory' },
        { type: 'string', name: 'prices' },
      ]
    }
  ]),
  ...createDoc('/merchants/{merchantId}/advertisings/{advertisingId}', ['Advertising'], [
    {
      method: 'delete',
      title: 'Remove advertising',
      description: 'Remove advertising endpoint',
    },
    {
      method: 'get',
      title: 'Get advertising',
      description: 'Get advertising endpoint',
    },
    {
      method: 'patch',
      title: 'Update advertising',
      description: 'Update advertising endpoint',
      objectSchema: updateAdvertisingSchema
    },
  ], {
    pathVariables: [{ type: 'string', name: 'merchantId' }, { type: 'string', name: 'advertisingId' }],
  }),
  ...createDoc('/merchants/{merchantId}/advertisings/{advertisingId}/questions', ['Advertising Question'], [
    {
      method: 'post',
      title: 'Register advertising question',
      description: 'Register advertising question endpoint',
      objectSchema: storeAdvertisingQuestionSchema
    },
    {
      method: 'get',
      title: 'Get question and answers',
      description: 'Get question and answers endpoint',
    }
  ], {
    pathVariables: [{ type: 'string', name: 'merchantId' }, { type: 'string', name: 'advertisingId' }],
  }),
  ...createDoc('/merchants/{merchantId}/advertisings/{advertisingId}/questions/{questionId}/answers', ['Advertising Question Answer'], [
    {
      method: 'post',
      title: 'Register advertising question answer',
      description: 'Register advertising question answer endpoint',
      objectSchema: storeAdvertisingQuestionSchema
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'merchantId' },
      { type: 'string', name: 'advertisingId' },
      { type: 'string', name: 'questionId' },
    ],
  }),
  ...createDoc('/merchants/{merchantId}/advertisings/{advertisingId}/favorites', ['Advertising Favorite'], [
    {
      method: 'post',
      title: 'Register advertising favorite',
      description: 'Register advertising favorite endpoint',
      objectSchema: storeAdvertisingFavoriteSchema
    },
    {
      method: 'get',
      title: 'Get advertising favorites',
      description: 'Get advertising favorites endpoint',
    },
  ], {
    pathVariables: [{ type: 'string', name: 'merchantId' }, { type: 'string', name: 'advertisingId' }],
  }),
  ...createDoc('/merchants/{merchantId}/advertisings/{advertisingId}/favorites/{favoriteId}', ['Advertising Favorite'], [
    {
      method: 'delete',
      title: 'Delete advertising favorite',
      description: 'Delete advertising favorite endpoint',
    },
  ], {
    pathVariables: [
      { type: 'string', name: 'merchantId' },
      { type: 'string', name: 'advertisingId' },
      { type: 'string', name: 'favoriteId' },
    ],
  }),
  ...createDoc('/favorites', ['Advertising Favorite'], [
    {
      method: 'get',
      title: 'Get advertising favorites',
      description: 'Get advertising favorites endpoint',
      queryParams: [{ type: 'string', name: 'externalId' }]
    },
  ]),
}

export default merchantDocs
