import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Advertising from '@Entities/AdvertisingEntity'

@EntityRepository(Advertising)
export default class AdvertisingRepository extends BaseRepository<Advertising> {
  findByExternalId(externalId?: string) {
    return this.find({
      ...(externalId ? { externalId } : {}),
      active: true,
    })
  }
}
