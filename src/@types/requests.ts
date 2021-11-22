import { Request } from 'express'

import Merchant from '@Entities/MerchantEntity'

export interface RequestWithMerchant extends Request {
  merchant?: Merchant;
}
