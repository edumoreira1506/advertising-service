import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import { RequestWithMerchantAndAdvertising } from '@Types/requests'
import AdvertisingQuestionBuilder from '@Builders/AdvertisingQuestionBuilder'
import AdvertisingQuestionRepository from '@Repositories/AdvertisingQuestionRepository'

class AdvertisingQuestionController  {
  constructor() {
    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithMerchantAndAdvertising, res: Response) {
    const advertising = req.advertising
    const merchant = req.merchant

    if (!advertising || !merchant) throw new NotFoundError()

    const advertisingQuestionDTO = new AdvertisingQuestionBuilder()
      .setExternalId(req.body.externalId)
      .setContent(req.body.content)
      .setAdvertising(advertising)
      .build()

    const advertisingQuestion = await AdvertisingQuestionRepository.save(advertisingQuestionDTO)

    return BaseController.successResponse(res, { advertisingQuestion, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  async index(req: RequestWithMerchantAndAdvertising, res: Response) {
    const advertising = req.advertising
    const merchant = req.merchant

    if (!advertising || !merchant) throw new NotFoundError()

    const questions = await AdvertisingQuestionRepository.getByAdvertisingId(advertising.id)

    return BaseController.successResponse(res, { questions })
  }
}

export default new AdvertisingQuestionController()
