import { Request } from 'express'

import Merchant from '@Entities/MerchantEntity'
import Advertising from '@Entities/AdvertisingEntity'

export interface RequestWithMerchant extends Request {
  merchant?: Merchant;
}

export interface RequestWithMerchantAndAdvertising extends RequestWithMerchant {
  advertising?: Advertising;
}
