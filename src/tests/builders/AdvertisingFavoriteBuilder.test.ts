import faker from '@faker-js/faker'
import { advertisingFactory } from '@cig-platform/factories'

import AdvertisingFavoriteBuilder from '@Builders/AdvertisingFavoriteBuilder'
import i18n from '@Configs/i18n'

describe('AdvertisingFavoriteBuilder', () => {
  describe('.build', () => {
    it('a valid advertising favorite', async () => {
      const externalId = faker.datatype.uuid()
      const advertising = advertisingFactory()
      const mockAdvertisingFavoriteRepository: any = {
        search: jest.fn().mockResolvedValue([])
      }
      const advertisingFavoriteBuilder = await new AdvertisingFavoriteBuilder(mockAdvertisingFavoriteRepository)
        .setExternalId(externalId)
        .setAdvertising(advertising as any)

      expect(await advertisingFavoriteBuilder.build()).toMatchObject({
        externalId,
        advertising
      })
    })

    it('throwns an error when already exists an advertising favorite with same external id', async () => {
      const advertisingFavorite = {}
      const advertising = advertisingFactory()
      const mockAdvertisingRepository: any = {
        search: jest.fn().mockResolvedValue([advertisingFavorite])
      }
      const advertisingFavoriteBuilder = await new AdvertisingFavoriteBuilder(mockAdvertisingRepository)
        .setExternalId(advertising.externalId)
        .setAdvertising(advertising as any)

      await expect(advertisingFavoriteBuilder.build).rejects.toThrow(i18n.__('errors.already-favorited'))
    })
  })
})
