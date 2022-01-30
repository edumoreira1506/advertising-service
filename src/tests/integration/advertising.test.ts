import request from 'supertest'
import typeorm from 'typeorm'
import { advertisingFactory, merchantFactory } from '@cig-platform/factories'

import App from '@Configs/server'
import i18n from '@Configs/i18n'
import Advertising from '@Entities/AdvertisingEntity'

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
}))

describe('Advertising actions', () => {
  describe('Register', () => {
    it('is a valid advertising', async () => {
      const mockSave = jest.fn()
      const advertising = advertisingFactory()
      const merchant = merchantFactory()
      const mockFindById = jest.fn().mockResolvedValue(merchant)
      const mockSearch = jest.fn().mockResolvedValue([])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        search: mockSearch,
      })

      const response = await request(App).post(`/v1/merchants/${merchant.id}/advertisings`).send({
        externalId: advertising.externalId,
        price: advertising.price,
      })
      
      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        message: i18n.__('messages.success'),
        ok: true,
      })
      expect(mockSearch).toHaveBeenLastCalledWith({ externalId: advertising.externalId, finished: false })
      expect(mockSave).toHaveBeenCalledWith(expect.objectContaining({
        externalId: advertising.externalId,
        price: advertising.price,
      }))
    })

    it('is an invalid advertising when merchant does not exist', async () => {
      const mockSave = jest.fn()
      const advertising = advertisingFactory()
      const merchant = merchantFactory()
      const mockFindById = jest.fn().mockResolvedValue(undefined)
      const mockSearch = jest.fn().mockResolvedValue([])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        search: mockSearch,
      })

      const response = await request(App).post(`/v1/merchants/${merchant.id}/advertisings`).send({
        externalId: advertising.externalId,
        price: advertising.price,
      })
      
      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'NotFoundError',
          message: i18n.__('errors.not-found')
        }
      })
      expect(mockSearch).not.toHaveBeenCalled()
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid advertising when is a duplicated external id', async () => {
      const mockSave = jest.fn()
      const advertising = advertisingFactory()
      const merchant = merchantFactory()
      const mockFindById = jest.fn().mockResolvedValue(merchant)
      const mockSearch = jest.fn().mockResolvedValue([advertising])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        search: mockSearch,
      })

      const response = await request(App).post(`/v1/merchants/${merchant.id}/advertisings`).send({
        externalId: advertising.externalId,
        price: advertising.price,
      })
      
      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        ok: false,
        error: {
          name: 'ValidationError',
          message: i18n.__('merchant.errors.duplicated-external-id')
        }
      })
      expect(mockSearch).toHaveBeenLastCalledWith({ externalId: advertising.externalId, finished: false })
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid advertising when has no external id', async () => {
      const mockSave = jest.fn()
      const advertising = advertisingFactory()
      const merchant = merchantFactory()
      const mockFindById = jest.fn().mockResolvedValue(merchant)
      const mockSearch = jest.fn().mockResolvedValue([])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        search: mockSearch,
      })

      const response = await request(App).post(`/v1/merchants/${merchant.id}/advertisings`).send({
        price: advertising.price,
      })
      
      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        error: {
          name: 'ValidationError',
          message: i18n.__('required-field', { field: 'externalId' })
        },
        ok: false,
      })
      expect(mockSearch).not.toHaveBeenCalled()
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid advertising when has no external id', async () => {
      const mockSave = jest.fn()
      const advertising = advertisingFactory()
      const merchant = merchantFactory()
      const mockFindById = jest.fn().mockResolvedValue(merchant)
      const mockSearch = jest.fn().mockResolvedValue([])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        search: mockSearch,
      })

      const response = await request(App).post(`/v1/merchants/${merchant.id}/advertisings`).send({
        externalId: advertising.externalId,
      })
      
      expect(response.statusCode).toBe(400)
      expect(response.body).toMatchObject({
        error: {
          name: 'ValidationError',
          message: i18n.__('required-field', { field: i18n.__('advertising.fields.price') })
        },
        ok: false,
      })
      expect(mockSearch).not.toHaveBeenCalled()
      expect(mockSave).not.toHaveBeenCalled()
    })
  })

  describe('Index', () => {
    it('returns all advertisings', async () => {
      const advertisings: Advertising[] = []
      const merchant = merchantFactory()
      const mockSearch =jest.fn().mockResolvedValue(advertisings) 
      const externalId = 'mock external id'

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        search: mockSearch,
        findById: jest.fn().mockResolvedValue(merchant)
      })

      const response = await request(App).get(`/v1/merchants/${merchant.id}/advertisings?externalId=${externalId}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        ok: true,
        advertisings
      })
      expect(mockSearch).toHaveBeenCalledWith({ externalId, merchantId: merchant.id })
    })
  })
})
