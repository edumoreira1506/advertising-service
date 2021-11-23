import { Request, Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import AdvertisingRepository from '@Repositories/AdvertisingRepository'
import Advertising from '@Entities/AdvertisingEntity'
import { RequestWithMerchant } from '@Types/requests'
import AdvertisingBuilder from '@Builders/AdvertisingBuilder'

class AdvertisingController extends BaseController<Advertising, AdvertisingRepository>  {
  constructor(repository: ObjectType<Advertising>) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithMerchant, res: Response): Promise<Response> {
    const merchant = req.merchant

    if (!merchant) throw new NotFoundError()

    const advertisingDTO = await new AdvertisingBuilder(this.repository)
      .setExternalId(req.body.externalId)
      .serPrice(req.body.price)
      .setMerchant(merchant)
      .build()

    const advertising = await this.repository.save(advertisingDTO)

    return BaseController.successResponse(res, { advertising, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response): Promise<Response> {
    const externalId = req.query.externalId
    const advertisings = await this.repository.findByExternalId(externalId?.toString())

    return BaseController.successResponse(res, { advertisings })
  }
}

export default new AdvertisingController(AdvertisingRepository)
