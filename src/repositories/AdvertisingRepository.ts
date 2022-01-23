import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Advertising from '@Entities/AdvertisingEntity'

type SearchParams = {
  externalId?: string;
  merchantId?: string;
}

@EntityRepository(Advertising)
export default class AdvertisingRepository extends BaseRepository<Advertising> {
  search({ externalId, merchantId }: SearchParams = {}) {
    return this.find({
      ...(externalId ? { externalId } : {}),
      ...(merchantId ? { merchantId } : {}),
      active: true,
    })
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
