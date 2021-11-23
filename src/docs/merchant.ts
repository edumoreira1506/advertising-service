import { createDoc } from '@cig-platform/docs'
import { storeAdvertisingSchema } from '@Schemas/AdvertisingSchemas'
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
}

export default merchantDocs
