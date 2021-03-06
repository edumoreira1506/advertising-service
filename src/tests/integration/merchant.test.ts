import request from 'supertest'
import { merchantFactory } from '@cig-platform/factories'

import App from '@Configs/server'
import i18n from '@Configs/i18n'
import Merchant from '@Entities/MerchantEntity'
import MerchantRepository from '@Repositories/MerchantRepository'

jest.mock('typeorm', () => ({
  createConnection: jest.fn().mockResolvedValue({}),
  Column: jest.fn(),
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
  CreateDateColumn: jest.fn(),
  EntityRepository: jest.fn(),
  Repository: jest.fn(),
  getCustomRepository: jest.fn().mockReturnValue({
    save: jest.fn()
  }),
  ManyToOne: jest.fn(),
  JoinColumn: jest.fn(),
  OneToMany: jest.fn(),
  DataSource: jest.fn().mockReturnValue({
    initialize: jest.fn().mockResolvedValue(undefined),
    getRepository: jest.fn().mockReturnValue({
      extend: jest.fn().mockReturnValue({
        save: jest.fn(),
        findByExternalId: jest.fn(),
        findById: jest.fn()
      })
    })
  })
}))

describe('Merchant actions', () => {
  describe('Register', () => {
    it('is a valid merchant', async () => {
      const mockSave = jest.fn()
      const merchant = merchantFactory()

      jest.spyOn(MerchantRepository, 'save').mockImplementation(mockSave)
      jest.spyOn(MerchantRepository, 'findByExternalId').mockImplementation(jest.fn().mockResolvedValue([]))

      const response = await request(App).post('/v1/merchants').send({
        externalId: merchant.externalId
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        message: i18n.__('messages.success'),
        ok: true,
      })
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
        externalId: merchant.externalId
      }))
    })

    it('is an invalid merchant when has no external id', async () => {
      const mockSave = jest.fn()

      jest.spyOn(MerchantRepository, 'save').mockImplementation(mockSave)

      const response = await request(App).post('/v1/merchants')

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        error: {
          name: 'ValidationError',
          message: i18n.__('required-field', { field: 'externalId' })
        },
        ok: false,
      })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid merchant when external id is duplicated', async () => {
      const mockSave = jest.fn()
      const merchant = merchantFactory()
      const mockFindByExternalId = jest.fn().mockResolvedValue([merchant])

      jest.spyOn(MerchantRepository, 'save').mockImplementation(mockSave)
      jest.spyOn(MerchantRepository, 'findByExternalId').mockImplementation(mockFindByExternalId)

      const response = await request(App).post('/v1/merchants').send({
        externalId: merchant.externalId
      })

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        error: {
          name: 'ValidationError',
          message: i18n.__('merchant.errors.duplicated-external-id')
        },
        ok: false,
      })
      expect(mockSave).not.toHaveBeenCalled()
      expect(mockFindByExternalId).toHaveBeenCalledWith(merchant.externalId)
    })
  })

  describe('Index', () => {
    it('returns all merchants', async () => {
      const merchants: Merchant[] = []
      const mockFindByExternalId =jest.fn().mockResolvedValue(merchants) 
      const externalId = 'mock external id'

      jest.spyOn(MerchantRepository, 'findByExternalId').mockImplementation(mockFindByExternalId)

      const response = await request(App).get(`/v1/merchants?externalId=${externalId}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        ok: true,
        merchants
      })
      expect(mockFindByExternalId).toHaveBeenCalledWith(externalId)
    })
  })

  describe('Show', () => {
    it('return the merchant', async () => {
      const merchant = merchantFactory()
      const mockFindById =jest.fn().mockResolvedValue(merchant) 

      jest.spyOn(MerchantRepository, 'findById').mockImplementation(mockFindById)

      const response = await request(App).get(`/v1/merchants/${merchant.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        ok: true,
        merchant
      })
      expect(mockFindById).toHaveBeenCalledWith(merchant.id)
    })

    it('returns a not found error', async () => {
      const merchantId = merchantFactory().id
      const mockFindById =jest.fn().mockResolvedValue(undefined) 

      jest.spyOn(MerchantRepository, 'findById').mockImplementation(mockFindById)

      const response = await request(App).get(`/v1/merchants/${merchantId}`)

      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        error: {
          name: 'NotFoundError',
          message: i18n.__('errors.not-found')
        },
        ok: false,
      })
      expect(mockFindById).toHaveBeenCalledWith(merchantId)
    })
  })
})
