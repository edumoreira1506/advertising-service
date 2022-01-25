import { NextFunction, Response } from 'express'
import { ApiError, AuthError, BaseController, NotFoundError, withRequestParam } from '@cig-platform/core'

import { RequestWithMerchantAndAdvertisingAndQuestion } from '@Types/requests'
import AdvertisingQuestionRepository from '@Repositories/AdvertisingQuestionRepository'
import AdvertisingQuestion from '@Entities/AdvertisingQuestionEntity'
import AdvertisingQuestionController from '@Controllers/AdvertisingQuestionController'

export const withQuestionParamFactory =
  (errorCallback: (res: Response, error: ApiError) => Response) =>
    (req: RequestWithMerchantAndAdvertisingAndQuestion, res: Response, next: NextFunction) => {
      return withRequestParam<AdvertisingQuestionRepository, AdvertisingQuestion>('questionId', 'question', AdvertisingQuestionController, errorCallback)(req, res, () => {
        try {
          if (!req.advertising || !req.merchant || !req.question) throw new NotFoundError()
          if (req.question.advertisingId !== req.advertising.id) throw new AuthError()

          next()
        } catch (error: any) {
          return errorCallback(res, error?.getError?.() ?? error)
        }
      })
    }

export default withQuestionParamFactory(BaseController.errorResponse)
