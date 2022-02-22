import { EntityRepository, In } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Advertising from '@Entities/AdvertisingEntity'

type SearchParams = {
  externalId?: string;
  merchantId?: string;
  finished?: boolean;
  advertisingIds?: string[];
  sort?: string;
}

@EntityRepository(Advertising)
export default class AdvertisingRepository extends BaseRepository<Advertising> {
  search({
    externalId,
    merchantId,
    finished,
    advertisingIds = [],
    sort
  }: SearchParams = {}) {
    return this.find({
      ...(externalId ? { externalId } : {}),
      ...(merchantId ? { merchantId } : {}),
      ...(typeof finished === 'boolean' ? { finished } : {}),
      ...(advertisingIds.length ? { id: In(advertisingIds) } : {}),
      active: true,
      ...(sort ? {
        order: {
          ...(sort === 'MAX_TO_MIN' ? { price: 'ASC' } : {}),
          ...(sort === 'MIN_TO_MAX' ? { price: 'DESC' } : {}),
        }
      } : {})
    })
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
