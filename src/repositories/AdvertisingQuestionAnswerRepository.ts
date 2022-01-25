import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import AdvertisingQuestionAnswer from '@Entities/AdvertisingQuestionAnswerEntity'

@EntityRepository(AdvertisingQuestionAnswer)
export default class AdvertisingQuestionAnswerRepository extends BaseRepository<AdvertisingQuestionAnswer> {
  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
