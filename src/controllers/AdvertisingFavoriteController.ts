import { DataSource, ObjectType } from 'typeorm'
import { Request, Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'
import { RequestWithMerchantAndAdvertising, RequestWithMerchantAndAdvertisingAndFavorite } from '@Types/requests'
import AdvertisingFavoriteBuilder from '@Builders/AdvertisingFavoriteBuilder'
import { dataSource } from '@Configs/database'

class AdvertisingFavoriteController extends BaseController<AdvertisingFavorite>  {
  constructor(repository: ObjectType<AdvertisingFavorite>, dataSource: DataSource) {
    super(repository, dataSource)

    this.store = this.store.bind(this)
    this.remove = this.remove.bind(this)
    this.index = this.index.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithMerchantAndAdvertising, res: Response) {
    const advertising = req.advertising
    const merchant = req.merchant

    if (!advertising || !merchant) throw new NotFoundError()

    const advertisingFavoriteDTO = await new AdvertisingFavoriteBuilder(this.repository)
      .setExternalId(req.body.externalId)
      .setAdvertising(advertising)
      .build()

    const advertisingFavorite = await this.repository.save(advertisingFavoriteDTO)

    return BaseController.successResponse(res, { advertisingFavorite, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.deleted'))
  async remove(req: RequestWithMerchantAndAdvertisingAndFavorite) {
    const advertising = req.advertising
    const merchant = req.merchant
    const favorite = req.favorite

    if (!advertising || !merchant || !favorite) throw new NotFoundError()

    await this.repository.deleteById(favorite.id)
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response) {
    const externalId = String(req?.query?.externalId ?? '')
    const advertisingId =  req?.params?.advertisingId
    const favorites = await this.repository.search({ externalId, advertisingId })

    return BaseController.successResponse(res, { favorites })
  }
}

export default new AdvertisingFavoriteController(AdvertisingFavorite, dataSource)
