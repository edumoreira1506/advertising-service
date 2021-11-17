import { createDoc } from '@cig-platform/docs'
import { storeMerchantSchema } from '@Schemas/MerchantSchemas'

const userDocs = {
  ...createDoc('/merchants', ['Merchant'], [
    {
      method: 'post',
      title: 'Register merchant',
      description: 'Register merchant endpoint',
      objectSchema: storeMerchantSchema
    } 
  ])
}

export default userDocs
