import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import { RequestWithMerchantAndAdvertisingAndFavorite } from '@Types/requests'
import AdvertisingFavoriteRepository from '@Repositories/AdvertisingFavoriteRepository'
import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'
import AdvertisingFavoriteController from '@Controllers/AdvertisingFavoriteController'

export const withFavoriteParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithMerchantAndAdvertisingAndFavorite, res: Response, next: NextFunction) => {
      return withRequestParam<AdvertisingFavoriteRepository, AdvertisingFavorite>('favoriteId', 'favorite', AdvertisingFavoriteController, errorCallback)(req, res, () => {
        try {
          if (!req.advertising || !req.merchant || !req?.favorite?.active) throw new NotFoundError()
          if (req.favorite.advertisingId !== req.advertising.id) throw new AuthError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export default withFavoriteParamFactory(BaseController.errorResponse)
