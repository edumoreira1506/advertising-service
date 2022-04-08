import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import { dataSource } from '@Configs/database'
import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'

const BaseRepository = BaseRepositoryFunctionsGenerator<AdvertisingFavorite>()

const AdvertisingFavoriteRepository = dataSource.getRepository(AdvertisingFavorite).extend({
  ...BaseRepository,
  search({
    externalId,
    advertisingId
  }: {
    externalId?: string;
    advertisingId?: string;
  }) {
    return this.find({
      where: {
        ...(externalId ? { externalId } : {}),
        ...(advertisingId ? { advertisingId } : {}),
        active: true
      },
    })
  },

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
})

export default AdvertisingFavoriteRepository
