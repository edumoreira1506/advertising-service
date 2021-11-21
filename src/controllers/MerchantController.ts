import { Request, Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import MerchantRepository from '@Repositories/MerchantRepository'
import Merchant from '@Entities/MerchantEntity'
import MerchantBuilder from '@Builders/MerchantBuilder'

class MerchantController extends BaseController<Merchant, MerchantRepository>  {
  constructor(repository: ObjectType<Merchant>) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: Request, res: Response): Promise<Response> {
    const merchantDTO = await new MerchantBuilder(this.repository)
      .setExternalId(req.body.externalId)
      .build()

    const merchant = await this.repository.save(merchantDTO)

    return BaseController.successResponse(res, { merchant, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response): Promise<Response> {
    const externalId = req.query.externalId
    const merchants = await this.repository.findByExternalId(externalId?.toString())

    return BaseController.successResponse(res, { merchants })
  }
}

export default new MerchantController(MerchantRepository)
