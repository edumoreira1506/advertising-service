import { ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import AdvertisingQuestionRepository from '@Repositories/AdvertisingQuestionRepository'
import Advertising from '@Entities/AdvertisingEntity'
import { RequestWithMerchantAndAdvertising } from '@Types/requests'
import AdvertisingQuestionBuilder from '@Builders/AdvertisingQuestionBuilder'

class AdvertisingQuestionController extends BaseController<Advertising, AdvertisingQuestionRepository>  {
  constructor(repository: ObjectType<Advertising>) {
    super(repository)

    this.store = this.store.bind(this)
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

    const advertisingQuestion = await this.repository.save(advertisingQuestionDTO)

    return BaseController.successResponse(res, { advertisingQuestion, message: i18n.__('messages.success') })
  }
}

export default new AdvertisingQuestionController(AdvertisingQuestionRepository)
