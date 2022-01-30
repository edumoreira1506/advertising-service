import { Request, Response } from 'express'
import { ObjectType } from 'typeorm'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import AdvertisingRepository from '@Repositories/AdvertisingRepository'
import Advertising from '@Entities/AdvertisingEntity'
import { RequestWithMerchant, RequestWithMerchantAndAdvertising } from '@Types/requests'
import AdvertisingBuilder from '@Builders/AdvertisingBuilder'

class AdvertisingController extends BaseController<Advertising, AdvertisingRepository>  {
  constructor(repository: ObjectType<Advertising>) {
    super(repository)

    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
    this.remove = this.remove.bind(this)
    this.update = this.update.bind(this)
    this.show = this.show.bind(this)
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
  @BaseController.actionHandler(i18n.__('common.updated'))
  async update(req: RequestWithMerchantAndAdvertising) {
    const advertising = req.advertising
    const merchant = req.merchant

    if (!advertising || !merchant) throw new NotFoundError()

    const newPrice = req.body.price
    const finished = Boolean(req?.body?.finished)

    await this.repository.update({ id: advertising.id }, { price: Number(newPrice), finished })
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response): Promise<Response> {
    const externalId = req.query.externalId
    const merchantId = req.params.merchantId
    const advertisings = await this.repository.search({
      externalId: externalId?.toString(),
      merchantId
    })

    return BaseController.successResponse(res, { advertisings })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.deleted'))
  async remove(req: RequestWithMerchantAndAdvertising) {
    const advertising = req.advertising

    if (!advertising) throw new NotFoundError()

    await this.repository.deleteById(advertising.id)
  }

  @BaseController.errorHandler()
  async show(req: RequestWithMerchantAndAdvertising, res: Response) {
    const advertising = req.advertising
    const merchant = req.merchant

    if (!advertising || !merchant) throw new NotFoundError()

    return BaseController.successResponse(res, { advertising })
  }
}

export default new AdvertisingController(AdvertisingRepository)
