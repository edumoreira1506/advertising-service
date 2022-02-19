import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'

@EntityRepository(AdvertisingFavorite)
export default class AdvertisingFavoriteRepository extends BaseRepository<AdvertisingFavorite> {
  search({
    externalId
  }: { externalId: string; }) {
    return this.find({
      where: { externalId, active: true },
    })
  }
}
