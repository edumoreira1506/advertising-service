import {  withRequestParam } from '@cig-platform/core'

import MerchantController from '@Controllers/MerchantController'
import MerchantRepository from '@Repositories/MerchantRepository'
import Merchant from '@Entities/MerchantEntity'

export default withRequestParam<MerchantRepository, Merchant>('merchantId', 'merchant', MerchantController)
