import { ValidationError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import Merchant from '@Entities/MerchantEntity'
import MerchantRepository from '@Repositories/MerchantRepository'

export default class BreederBuilder {
  private _externalId = ''
  private _repository: typeof MerchantRepository

  constructor(merchantRepository: typeof MerchantRepository) {
    this._repository = merchantRepository
  }

  async validate() {
    const merchantWithSameExternalId = await this._repository.findByExternalId(this._externalId)

    if (merchantWithSameExternalId.length) {
      throw new ValidationError(i18n.__('merchant.errors.duplicated-external-id'))
    }
  }

  setExternalId(externalId: string) {
    this._externalId = externalId

    return this
  }

  build = async () => {
    await this.validate()

    const merchant = new Merchant()

    merchant.externalId = this._externalId

    return merchant
  }
}
