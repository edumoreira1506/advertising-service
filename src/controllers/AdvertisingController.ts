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
    this.search = this.search.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: RequestWithMerchant, res: Response): Promise<Response> {
    const merchant = req.merchant

    if (!merchant) throw new NotFoundError()

    const advertisingDTO = await new AdvertisingBuilder(this.repository)
      .setExternalId(req.body.externalId)
      .serPrice(req.body.price)
      .setMetadata(req.body.metadata)
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
    const finished = typeof req?.body?.finished === 'boolean' ? req.body.finished : undefined

    await this.repository.update({ id: advertising.id }, {
      price: Number(newPrice),
      ...(finished ? { finished } : {})
    })
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response): Promise<Response> {
    const externalId = req.query.externalId
    const finished = req.query?.finished ? Boolean(req.query.finished === 'true') : undefined
    const merchantId = req.params.merchantId
    const advertisings = await this.repository.search({
      externalId: externalId?.toString(),
      merchantId,
      finished,
    })

    return BaseController.successResponse(res, { advertisings })
  }

  @BaseController.errorHandler()
  async search(req: Request, res: Response): Promise<Response> {
    const advertisingIds = (req?.query?.advertisingIds?.toString() ?? '').split(',').filter(Boolean)
    const favoriteExternalId = req?.query?.favoriteExternalId?.toString()
    const sort = req?.query?.sort?.toString()
    const gender = req.query?.gender?.toString()?.split(',').filter(Boolean) ?? []
    const type = req.query?.type?.toString().split(',').filter(Boolean) ?? []
    const tail = req.query?.tail?.toString().split(',').filter(Boolean) ?? []
    const dewlap = req.query?.dewlap?.toString().split(',').filter(Boolean) ?? []
    const crest = req.query?.crest?.toString().split(',').filter(Boolean) ?? []
    const description = req.query?.description?.toString()
    const name = req.query?.name?.toString()
    const genderCategory = req?.query?.genderCategory?.toString()?.split(',').filter(Boolean) ?? []
    const prices = req?.query?.prices && JSON.parse(req.query.prices.toString())
    const advertisings = await this.repository.search({
      advertisingIds,
      sort,
      gender,
      type,
      tail,
      dewlap,
      crest,
      description,
      name,
      genderCategory,
      prices,
      favoriteExternalId
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
