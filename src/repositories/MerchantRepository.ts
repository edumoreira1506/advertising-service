import {  BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import Merchant from '@Entities/MerchantEntity'
import { dataSource } from '@Configs/database'

const BaseRepository = BaseRepositoryFunctionsGenerator<Merchant>()

const MerchantRepository = dataSource.getRepository(Merchant).extend({
  ...BaseRepository,
  findByExternalId(externalId?: string) {
    return this.find({
      where: {
        ...(externalId ? { externalId } : {}),
        active: true,
      }
    })
  }
})

export default MerchantRepository
