import { Request, Response } from 'express'
import { ApiError, BaseController, NotFoundError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import MerchantBuilder from '@Builders/MerchantBuilder'
import { RequestWithMerchant } from '@Types/requests'
import MerchantRepository from '@Repositories/MerchantRepository'

class MerchantController  {
  constructor() {
    this.store = this.store.bind(this)
    this.index = this.index.bind(this)
    this.rollback = this.rollback.bind(this)
  }

  @BaseController.errorHandler()
  async store(req: Request, res: Response): Promise<Response> {
    const merchantDTO = await new MerchantBuilder(MerchantRepository)
      .setExternalId(req.body.externalId)
      .build()

    const merchant = await MerchantRepository.save(merchantDTO)

    return BaseController.successResponse(res, { merchant, message: i18n.__('messages.success') })
  }

  @BaseController.errorHandler()
  async index(req: Request, res: Response): Promise<Response> {
    const externalId = req.query.externalId
    const merchants = await MerchantRepository.findByExternalId(externalId?.toString())

    return BaseController.successResponse(res, { merchants })
  }

  @BaseController.errorHandler()
  @BaseController.actionHandler(i18n.__('messages.removed'))
  async rollback(req: RequestWithMerchant): Promise<void> {
    const merchant = req.merchant

    if (!merchant) throw new NotFoundError()

    const now = new Date()
    const breederCreatedAt = merchant.createdAt
    const diffInMilliSeconds = Math.abs(now.getTime() - breederCreatedAt.getTime())
    const diffInSeconds = diffInMilliSeconds / 1000

    if (diffInSeconds > 60) throw new ApiError(i18n.__('rollback.errors.expired'))

    await MerchantRepository.delete({ id: merchant.id })
  }

  @BaseController.errorHandler()
  async show(req: RequestWithMerchant, res: Response): Promise<Response> {
    const merchant = req.merchant

    if (!merchant) throw new NotFoundError()

    return BaseController.successResponse(res, { merchant })
  }
}

export default new MerchantController()
