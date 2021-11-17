import Merchant from '@Entities/MerchantEntity'

export default class BreederBuilder {
  private _externalId = '';

  setExternalId(externalId: string) {
    this._externalId = externalId

    return this
  }

  build = () => {
    const merchant = new Merchant()

    merchant.externalId = this._externalId

    return merchant
  }
}
