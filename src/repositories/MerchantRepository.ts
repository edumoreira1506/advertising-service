import { EntityRepository } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Merchant from '@Entities/MerchantEntity'

@EntityRepository(Merchant)
export default class MerchantRepository extends BaseRepository<Merchant> {
}
