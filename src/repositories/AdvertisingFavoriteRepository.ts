import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'

@EntityRepository(AdvertisingFavorite)
export default class AdvertisingFavoriteRepository extends BaseRepository<AdvertisingFavorite> {
  search({
    externalId,
    advertisingId
  }: {
    externalId: string;
    advertisingId?: string;
  }) {
    return this.find({
      where: {
        externalId,
        ...(advertisingId ? { advertisingId } : {}),
        active: true
      },
    })
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
