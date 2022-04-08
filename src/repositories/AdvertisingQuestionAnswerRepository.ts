import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import AdvertisingQuestionAnswer from '@Entities/AdvertisingQuestionAnswerEntity'
import { dataSource } from '@Configs/database'

const BaseRepository = BaseRepositoryFunctionsGenerator<AdvertisingQuestionAnswer>()

const AdvertisingQuestionAnswerRepository = dataSource.getRepository(AdvertisingQuestionAnswer).extend({
  ...BaseRepository,
  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
})

export default AdvertisingQuestionAnswerRepository
