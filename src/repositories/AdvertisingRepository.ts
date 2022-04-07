import { Between, EntityRepository, In, Raw } from 'typeorm'
import { BaseRepository } from '@cig-platform/core'

import Advertising from '@Entities/AdvertisingEntity'

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
}

@EntityRepository(Advertising)
export default class AdvertisingRepository extends BaseRepository<Advertising> {
  static createSort(sort?: string) {
    if (!sort) return undefined

    const sortOptions: Record<string, object> = {
      MAX_TO_MIN: { price: 'DESC' },
      MIN_TO_MAX: { price: 'ASC' }
    }

    return sortOptions?.[sort]
  }

  static createWhereInMetadataField(fieldName: string, fieldValue: string[] = []) {
    return fieldValue?.length
      ? {
        metadata: Raw(() =>`"Advertising"."metadata"::json->>'${fieldName}' IN (:${fieldName})`, {
          [fieldName]: fieldValue.join(',')
        }),
      }
      : {}
  }

  static createWhereLikeMetadataField(fieldName: string, fieldValue = '') {
    return fieldValue?.length
      ? {
        metadata: Raw(() =>`"Advertising"."metadata"::json->>'${fieldName}' LIKE :${fieldName}`, {
          [fieldName]: `%${fieldValue}%`
        }),
      }
      : {}
  }

  static createFilters({
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
  }: SearchParams) {
    return {
      where: {
        ...(externalId ? { externalId } : {}),
        ...(merchantId ? { merchantId } : {}),
        ...(typeof finished === 'boolean' ? { finished } : {}),
        ...(advertisingIds?.length ? { id: In(advertisingIds) } : {}),
        ...(AdvertisingRepository.createWhereInMetadataField('gender', gender)),
        ...(AdvertisingRepository.createWhereInMetadataField('genderCategory', genderCategory)),
        ...(AdvertisingRepository.createWhereInMetadataField('type', type)),
        ...(AdvertisingRepository.createWhereInMetadataField('crest', crest)),
        ...(AdvertisingRepository.createWhereInMetadataField('dewlap', dewlap)),
        ...(AdvertisingRepository.createWhereInMetadataField('tail', tail)),
        ...(AdvertisingRepository.createWhereLikeMetadataField('name', name)),
        ...(AdvertisingRepository.createWhereLikeMetadataField('description', description)),
        ...(typeof prices?.min === 'number' && typeof prices?.max === 'number' ? {
          price: Between(prices.min, prices.max)
        } : {}),
        active: true,
      },
      order: AdvertisingRepository.createSort(sort)
    }
  }

  search(params: SearchParams = {}) {
    const { where, order } = AdvertisingRepository.createFilters(params)

    return this.find({
      where,
      order
    })
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
