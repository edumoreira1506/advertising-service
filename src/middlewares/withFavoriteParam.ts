import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import { RequestWithMerchantAndAdvertisingAndFavorite } from '@Types/requests'
import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'
import AdvertisingFavoriteRepository from '@Repositories/AdvertisingFavoriteRepository'

export const withFavoriteParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithMerchantAndAdvertisingAndFavorite, res: Response, next: NextFunction) => {
      return withRequestParam<AdvertisingFavorite>('favoriteId', 'favorite', AdvertisingFavoriteRepository, errorCallback)(req, res, () => {
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
