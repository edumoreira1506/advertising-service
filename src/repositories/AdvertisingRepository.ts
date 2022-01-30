import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Advertising from '@Entities/AdvertisingEntity'

type SearchParams = {
  externalId?: string;
  merchantId?: string;
  finished?: boolean;
}

@EntityRepository(Advertising)
export default class AdvertisingRepository extends BaseRepository<Advertising> {
  search({
    externalId,
    merchantId,
    finished
  }: SearchParams = {}) {
    return this.find({
      ...(externalId ? { externalId } : {}),
      ...(merchantId ? { merchantId } : {}),
      ...(typeof finished === 'boolean' ? { finished } : {}),
      active: true,
    })
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
