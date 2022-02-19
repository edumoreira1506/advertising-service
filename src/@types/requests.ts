import { Request } from 'express'

import Merchant from '@Entities/MerchantEntity'
import Advertising from '@Entities/AdvertisingEntity'
import AdvertisingQuestion from '@Entities/AdvertisingQuestionEntity'
import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'

export interface RequestWithMerchant extends Request {
  merchant?: Merchant;
}

export interface RequestWithMerchantAndAdvertising extends RequestWithMerchant {
  advertising?: Advertising;
}

export interface RequestWithMerchantAndAdvertisingAndQuestion extends RequestWithMerchantAndAdvertising {
  question?: AdvertisingQuestion;
}

export interface RequestWithMerchantAndAdvertisingAndFavorite extends RequestWithMerchantAndAdvertising {
  favorite?: AdvertisingFavorite;
}
