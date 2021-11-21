import { createDoc } from '@cig-platform/docs'
import { storeMerchantSchema } from '@Schemas/MerchantSchemas'

const userDocs = {
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
  ])
}

export default userDocs
