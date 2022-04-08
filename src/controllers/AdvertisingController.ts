import { Request, Response } from 'express'
import { BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import { RequestWithMerchant, RequestWithMerchantAndAdvertising } from '@Types/requests'
import AdvertisingBuilder from '@Builders/AdvertisingBuilder'
import AdvertisingRepository from '@Repositories/AdvertisingRepository'

class AdvertisingController {
  constructor() {
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

    const advertisingDTO = await new AdvertisingBuilder(AdvertisingRepository)
      .setExternalId(req.body.externalId)
      .serPrice(req.body.price)
      .setMetadata(req.body.metadata)
      .setMerchant(merchant)
      .build()

    const advertising = await AdvertisingRepository.save(advertisingDTO)

    return BaseController.successResponse(res, { advertising, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.updated'))
  async update(req: RequestWithMerchantAndAdvertising) {
    const advertising = req.advertising
    const merchant = req.merchant

    if (!advertising || !merchant) throw new NotFoundError()

    const price = Number(req?.body?.price ?? advertising?.price)
    const favoritesAmount = Number(req?.body?.favoritesAmount ?? advertising?.favoritesAmount ?? 0)
    const finished = typeof req?.body?.finished === 'boolean' ? req.body.finished : undefined
    const metadata = req?.body?.metadata ?? advertising?.metadata ?? {}

    await AdvertisingRepository.update({ id: advertising.id }, {
      price,
      ...(finished ? { finished } : {}),
      favoritesAmount,
      metadata
    })
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response): Promise<Response> {
    const externalId = req.query.externalId
    const finished = req.query?.finished ? Boolean(req.query.finished === 'true') : undefined
    const merchantId = req.params.merchantId
    const advertisings = await AdvertisingRepository.search({
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
    const page = Number(req?.query?.page ?? 0)
    const genderCategory = req?.query?.genderCategory?.toString()?.split(',').filter(Boolean) ?? []
    const prices = req?.query?.prices && JSON.parse(req.query.prices.toString())
    const queryParamsObject = {
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
      favoriteExternalId,
      page
    }

    const advertisings = await AdvertisingRepository.search(queryParamsObject)
    const pages = await AdvertisingRepository.countPages(queryParamsObject)

    return BaseController.successResponse(res, { advertisings, pages })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('common.deleted'))
  async remove(req: RequestWithMerchantAndAdvertising) {
    const advertising = req.advertising

    if (!advertising) throw new NotFoundError()

    await AdvertisingRepository.deleteById(advertising.id)
  }

  @BaseController.errorHandler()
  async show(req: RequestWithMerchantAndAdvertising, res: Response) {
    const advertising = req.advertising
    const merchant = req.merchant

    if (!advertising || !merchant) throw new NotFoundError()

    return BaseController.successResponse(res, { advertising })
  }
}

export default new AdvertisingController()
