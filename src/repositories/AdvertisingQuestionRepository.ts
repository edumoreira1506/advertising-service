import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import AdvertisingQuestion from '@Entities/AdvertisingQuestionEntity'
import { dataSource } from '@Configs/database'

const BaseRepository = BaseRepositoryFunctionsGenerator<AdvertisingQuestion>()

const AdvertisingQuestionRepository = dataSource.getRepository(AdvertisingQuestion).extend({
  ...BaseRepository,
  deleteById(id: string) {
    return this.updateById(id, { active: false })
  },
  getByAdvertisingId(advertisingId: string) {
    return this.find({
      where: { advertisingId },
      relations: ['answers'],
      order: {
        createdAt: 'DESC'
      }
    })
  }
})

export default AdvertisingQuestionRepository
