import {  withRequestParam } from '@cig-platform/core'

import MerchantController from '@Controllers/MerchantController'
import Merchant from '@Entities/MerchantEntity'

export default withRequestParam<Merchant>('merchantId', 'merchant', MerchantController)
