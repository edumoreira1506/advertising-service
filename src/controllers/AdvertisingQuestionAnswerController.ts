import { ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import AdvertisingQuestionRepository from '@Repositories/AdvertisingQuestionRepository'
import Advertising from '@Entities/AdvertisingEntity'
import { RequestWithMerchantAndAdvertisingAndQuestion } from '@Types/requests'
import AdvertisingQuestionAnswerBuilder from '@Builders/AdvertisingQuestionAnswerBuilder'

class AdvertisingQuestionAnswerController extends BaseController<Advertising, AdvertisingQuestionRepository>  {
  constructor(repository: ObjectType<Advertising>) {
    super(repository)

    this.store = this.store.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithMerchantAndAdvertisingAndQuestion, res: Response) {
    const advertising = req.advertising
    const question = req.question

    if (!advertising || !question) throw new NotFoundError()

    const advertisingQuestionAnswerDTO = new AdvertisingQuestionAnswerBuilder()
      .setExternalId(req.body.externalId)
      .setContent(req.body.content)
      .setQuestion(question)
      .build()

    const advertisingQuestionAnswer = await this.repository.save(advertisingQuestionAnswerDTO)

    return BaseController.successResponse(res, { advertisingQuestionAnswer, message: i18n.__('messages.success') })
  }
}

export default new AdvertisingQuestionAnswerController(AdvertisingQuestionRepository)
