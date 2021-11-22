import { ValidationError } from '@cig-platform/core'

import i18n from '@Configs/i18n'
import Advertising from '@Entities/AdvertisingEntity'
import Merchant from '@Entities/MerchantEntity'
import AdvertisingRepository from '@Repositories/AdvertisingRepository'

export default class AdvertisingBuilder {
  private _externalId = '';
  private _price: number;
  private _merchant: Merchant;
  private _repository: AdvertisingRepository;

  constructor(advertisingRepository: AdvertisingRepository) {
    this._repository = advertisingRepository
  }

  async validate() {
    const advertisingWithSameExternalId = await this._repository.findByExternalId(this._externalId)

    if (advertisingWithSameExternalId.length) {
      throw new ValidationError(i18n.__('advertising.errors.duplicated-external-id'))
    }
  }

  setExternalId(externalId: string) {
    this._externalId = externalId

    return this
  }

  setMerchant(merchant: Merchant) {
    this._merchant = merchant

    return this
  }

  serPrice(price: number) {
    this._price = price

    return this
  }

  build = async () => {
    await this.validate()

    const advertising = new Advertising()

    advertising.externalId = this._externalId
    advertising.merchant = this._merchant
    advertising.price = this._price

    return advertising
  }
}