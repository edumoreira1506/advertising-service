import Advertising from '@Entities/AdvertisingEntity'
import AdvertisingFavorite from '@Entities/AdvertisingFavoriteEntity'
import AlreadyFavoritedError from '@Errors/AlreadyFavoritedError'
import AdvertisingFavoriteRepository from '@Repositories/AdvertisingFavoriteRepository'

export default class AdvertisingFavoriteBuilder {
  private _externalId = '';
  private _advertising: Advertising;
  private _repository: AdvertisingFavoriteRepository;

  constructor(advertisingFavoriteRepository: AdvertisingFavoriteRepository) {
    this._repository = advertisingFavoriteRepository
  }

  setAdvertising(advertising: Advertising) {
    this._advertising = advertising

    return this
  }

  setExternalId(externalId: string) {
    this._externalId = externalId

    return this
  }

  async validate() {
    const favoriteWithSameExternalId = await this._repository.search({
      externalId: this._externalId,
      advertisingId: this._advertising.id
    })

    if (favoriteWithSameExternalId.length) {
      throw new AlreadyFavoritedError()
    }
  }

  build = async () => {
    await this.validate()

    const advertisingFavorite = new AdvertisingFavorite()

    advertisingFavorite.externalId = this._externalId
    advertisingFavorite.advertising = this._advertising

    return advertisingFavorite
  }
}
