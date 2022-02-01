import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import { RequestWithMerchantAndAdvertising } from '@Types/requests'
import AdvertisingRepository from '@Repositories/AdvertisingRepository'
import Advertising from '@Entities/AdvertisingEntity'
import AdvertisingController from '@Controllers/AdvertisingController'
import FinishedAdvertisingError from '@Errors/FinishedAdvertisingError'

export const withAdvertisingParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithMerchantAndAdvertising, res: Response, next: NextFunction) => {
      return withRequestParam<AdvertisingRepository, Advertising>('advertisingId', 'advertising', AdvertisingController, errorCallback)(req, res, () => {
        try {
          if (!req.advertising || !req.merchant) throw new NotFoundError()
          if (req.advertising.merchantId !== req.merchant.id) throw new AuthError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export const withUnfinishedAdvertisingParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithMerchantAndAdvertising, res: Response, next: NextFunction) => {
      return withRequestParam<AdvertisingRepository, Advertising>('advertisingId', 'advertising', AdvertisingController, errorCallback)(req, res, () => {
        try {
          if (!req.advertising || !req.merchant) throw new NotFoundError()
          if (req.advertising.merchantId !== req.merchant.id) throw new AuthError()
          if (req.advertising.finished) throw new FinishedAdvertisingError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export default withAdvertisingParamFactory(BaseController.errorResponse)

export const withUnfinishedAdvertisingParam = withUnfinishedAdvertisingParamFactory(BaseController.errorResponse)
