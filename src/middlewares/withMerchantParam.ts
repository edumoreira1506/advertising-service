import {  withRequestParam } from '@cig-platform/core'

import Merchant from '@Entities/MerchantEntity'
import MerchantRepository from '@Repositories/MerchantRepository'

export default withRequestParam<Merchant>('merchantId', 'merchant', MerchantRepository)
