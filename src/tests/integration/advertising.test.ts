import request from 'supertest'
import typeorm from 'typeorm'
import { advertisingFactory, merchantFactory } from '@cig-platform/factories'

import App from '@Configs/server'
import i18n from '@Configs/i18n'

jest.mock('typeorm', () => ({
  createConnection: jest.fn().mockResolvedValue({}),
  Column: jest.fn(),
  Entity: jest.fn(),
  PrimaryGeneratedColumn: jest.fn(),
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
      const mockFindByExternalId = jest.fn().mockResolvedValue([])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        findByExternalId: mockFindByExternalId,
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
      expect(mockFindByExternalId).toHaveBeenLastCalledWith(advertising.externalId)
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
      const mockFindByExternalId = jest.fn().mockResolvedValue([])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        findByExternalId: mockFindByExternalId,
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
      expect(mockFindByExternalId).not.toHaveBeenCalled()
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid advertising when is a duplicated external id', async () => {
      const mockSave = jest.fn()
      const advertising = advertisingFactory()
      const merchant = merchantFactory()
      const mockFindById = jest.fn().mockResolvedValue(merchant)
      const mockFindByExternalId = jest.fn().mockResolvedValue([advertising])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        findByExternalId: mockFindByExternalId,
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
      expect(mockFindByExternalId).toHaveBeenLastCalledWith(advertising.externalId)
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid advertising when has no external id', async () => {
      const mockSave = jest.fn()
      const advertising = advertisingFactory()
      const merchant = merchantFactory()
      const mockFindById = jest.fn().mockResolvedValue(merchant)
      const mockFindByExternalId = jest.fn().mockResolvedValue([])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        findByExternalId: mockFindByExternalId,
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
      expect(mockFindByExternalId).not.toHaveBeenCalled()
      expect(mockSave).not.toHaveBeenCalled()
    })

    it('is an invalid advertising when has no external id', async () => {
      const mockSave = jest.fn()
      const advertising = advertisingFactory()
      const merchant = merchantFactory()
      const mockFindById = jest.fn().mockResolvedValue(merchant)
      const mockFindByExternalId = jest.fn().mockResolvedValue([])

      jest.spyOn(typeorm, 'getCustomRepository').mockReturnValue({
        save: mockSave,
        findById: mockFindById,
        findByExternalId: mockFindByExternalId,
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
      expect(mockFindByExternalId).not.toHaveBeenCalled()
      expect(mockSave).not.toHaveBeenCalled()
    })
  })
})
