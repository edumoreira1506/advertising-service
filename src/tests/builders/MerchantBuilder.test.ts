import { merchantFactory } from '@cig-platform/factories'

import MerchantBuilder from '@Builders/MerchantBuilder'
import i18n from '@Configs/i18n'

describe('AdvertisingBuilder', () => {
  describe('.build', () => {
    it('a valid merchant', async () => {
      const mockMerchantRepository: any = {
        findByExternalId: jest.fn().mockResolvedValue([])
      }
      const merchant = merchantFactory()
      const merchantBuilder = await new MerchantBuilder(mockMerchantRepository)
        .setExternalId(merchant.externalId)

      expect(await merchantBuilder.build()).toMatchObject({
        externalId: merchant.externalId
      })
    })

    it('throwns an error when already exists an merchant with same external id', async () => {
      const merchant = merchantFactory()
      const mockMerchantRepository: any = {
        findByExternalId: jest.fn().mockResolvedValue([merchant])
      }
      const merchantBuilder = await new MerchantBuilder(mockMerchantRepository)
        .setExternalId(merchant.externalId)

      await expect(merchantBuilder.build).rejects.toThrow(i18n.__('merchant.errors.duplicated-external-id'))
    })
  })
})
