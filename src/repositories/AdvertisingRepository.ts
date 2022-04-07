import { Between, In, Raw } from 'typeorm'
import { BaseRepositoryFunctionsGenerator } from '@cig-platform/core'

import Advertising from '@Entities/AdvertisingEntity'
import { dataSource } from '@Configs/database'

type SearchParams = {
  externalId?: string;
  merchantId?: string;
  finished?: boolean;
  advertisingIds?: string[];
  sort?: string;
  gender?: string[];
  genderCategory?: string[];
  type?: string[];
  crest?: string[];
  dewlap?: string[];
  tail?: string[];
  description?: string;
  name?: string;
  prices?: { min?: number; max?: number };
  favoriteExternalId?: string;
  page?: number
}

const ITEMS_PER_PAGE = 30

const RepositoryHelpers = {
  createSort(sort?: string) {
    if (!sort) return undefined

    const sortOptions: Record<string, object> = {
      MAX_TO_MIN: { price: 'DESC' },
      MIN_TO_MAX: { price: 'ASC' },
      FEATURED: { favorites: 'ASC' }
    }

    return sortOptions?.[sort]
  },
  createWhereInMetadataField(fieldName: string, fieldValue: string[] = []) {
    return fieldValue?.length
      ? {
        metadata: Raw(() =>`"Advertising"."metadata"::json->>'${fieldName}' IN (:${fieldName})`, {
          [fieldName]: fieldValue.join(',')
        }),
      }
      : {}
  },
  createWhereLikeMetadataField(fieldName: string, fieldValue = '') {
    return fieldValue?.length
      ? {
        metadata: Raw(() =>`"Advertising"."metadata"::json->>'${fieldName}' LIKE :${fieldName}`, {
          [fieldName]: `%${fieldValue}%`
        }),
      }
      : {}
  },
  createFilters({
    advertisingIds,
    externalId,
    finished,
    merchantId,
    sort,
    gender,
    genderCategory,
    type,
    crest,
    dewlap,
    tail,
    name,
    description,
    prices,
    favoriteExternalId
  }: SearchParams) {
    return {
      where: {
        ...(externalId ? { externalId } : {}),
        ...(merchantId ? { merchantId } : {}),
        ...(typeof finished === 'boolean' ? { finished } : {}),
        ...(advertisingIds?.length ? { id: In(advertisingIds) } : {}),
        ...(this.createWhereInMetadataField('gender', gender)),
        ...(this.createWhereInMetadataField('genderCategory', genderCategory)),
        ...(this.createWhereInMetadataField('type', type)),
        ...(this.createWhereInMetadataField('crest', crest)),
        ...(this.createWhereInMetadataField('dewlap', dewlap)),
        ...(this.createWhereInMetadataField('tail', tail)),
        ...(this.createWhereLikeMetadataField('name', name)),
        ...(this.createWhereLikeMetadataField('description', description)),
        ...(favoriteExternalId ? {
          id: Raw(() =>'"Advertising"."id" IN (SELECT "AdvertisingFavorite"."advertising_id" FROM "advertising_favorites" "AdvertisingFavorite" WHERE "AdvertisingFavorite"."externalId" = :favoriteExternalId)', {
            favoriteExternalId
          })
        } : {}),
        ...(typeof prices?.min === 'number' && typeof prices?.max === 'number' ? {
          price: Between(prices.min, prices.max)
        } : {}),
        active: true,
      },
      order: this.createSort(sort)
    }
  }
}

const BaseRepository = BaseRepositoryFunctionsGenerator<Advertising>()

const AdvertisingRepository = dataSource.getRepository(Advertising).extend({
  ...BaseRepository,
  search({ page = 0, ...params }: SearchParams = {}) {
    const { where, order } = RepositoryHelpers.createFilters(params)

    return this.find({
      where,
      order,
      skip: page * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
      relations: ['favorites']
    })
  },
  async countPages(params: SearchParams) {
    const { where } = RepositoryHelpers.createFilters(params)

    const advertisingsAmount = await this.count({
      where
    })

    return Math.ceil(advertisingsAmount / ITEMS_PER_PAGE)
  },
  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
})

export default AdvertisingRepository
