import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import AdvertisingQuestion from '@Entities/AdvertisingQuestionEntity'

@EntityRepository(AdvertisingQuestion)
export default class AdvertisingQuestionRepository extends BaseRepository<AdvertisingQuestion> {
  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
