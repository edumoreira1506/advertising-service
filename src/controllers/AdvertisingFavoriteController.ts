import { ObjectType } from 'typeorm'
import { Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import AdvertisingFavoriteRepository from '@Repositories/AdvertisingFavoriteRepository'
import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'
import { RequestWithMerchantAndAdvertising } from '@Types/requests'
import AdvertisingFavoriteBuilder from '@Builders/AdvertisingFavoriteBuilder'

class AdvertisingFavoriteController extends BaseController<AdvertisingFavorite, AdvertisingFavoriteRepository>  {
  constructor(repository: ObjectType<AdvertisingFavorite>) {
    super(repository)

    this.store = this.store.bind(this)
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
}

export default new AdvertisingFavoriteController(AdvertisingFavoriteRepository)
