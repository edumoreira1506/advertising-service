import { advertisingFactory } from '@cig-platform/factories'

import AdvertisingBuilder from '@Builders/AdvertisingBuilder'
import i18n from '@Configs/i18n'

describe('AdvertisingBuilder', () => {
  describe('.build', () => {
    it('a valid advertising', async () => {
      const mockAdvertisingRepository: any = {
        search: jest.fn().mockResolvedValue([])
      }
      const advertising = advertisingFactory()
      const advertisingBuilder = await new AdvertisingBuilder(mockAdvertisingRepository)
        .serPrice(advertising.price)
        .setExternalId(advertising.externalId)

      expect(await advertisingBuilder.build()).toMatchObject({
        price: advertising.price,
        externalId: advertising.externalId,
      })
    })

    it('throwns an error when already exists an advertising with same external id', async () => {
      const advertising = advertisingFactory()
      const mockAdvertisingRepository: any = {
        search: jest.fn().mockResolvedValue([advertising])
      }
      const advertisingBuilder = await new AdvertisingBuilder(mockAdvertisingRepository)
        .serPrice(advertising.price)
        .setExternalId(advertising.externalId)

      await expect(advertisingBuilder.build).rejects.toThrow(i18n.__('advertising.errors.duplicated-external-id'))
    })
  })
})
