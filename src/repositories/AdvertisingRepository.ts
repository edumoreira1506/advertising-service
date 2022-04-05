import { Between, EntityRepository, In, Like } from 'typeorm'
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
    const commonMetadataQueryParams = {
      ...(gender?.length ? { gender: In(gender) } : {}),
      ...(genderCategory?.length ? { genderCategory: In(genderCategory) } : {}),
      ...(type?.length ? { type: In(type) } : {}),
      ...(crest?.length ? { crest: In(crest) } : {}),
      ...(dewlap?.length ? { dewlap: In(dewlap) } : {}),
      ...(tail?.length ? { tail: In(tail) } : {}),
    }
    const metadataParams = [
      (name ? { name: Like(`%${name}%`), ...commonMetadataQueryParams } : undefined),
      (description ? { description: Like(`%${description}%`), ...commonMetadataQueryParams } : undefined),
      (!name && !description ? commonMetadataQueryParams : undefined)
    ].filter(Boolean)

    return {
      where: {
        ...(externalId ? { externalId } : {}),
        ...(merchantId ? { merchantId } : {}),
        ...(typeof finished === 'boolean' ? { finished } : {}),
        ...(advertisingIds?.length ? { id: In(advertisingIds) } : {}),
        ...(Object.values(metadataParams).length ? { metadata: metadataParams } : {}),
        ...(typeof prices?.min === 'number' && typeof prices?.max === 'number' ? {
          price: Between(prices.min, prices.max)
        } : {}),
        active: true,
      },
      order: AdvertisingRepository.createSort(sort)
    }
  }

  search({
    externalId,
    merchantId,
    finished,
    advertisingIds = [],
    sort
  }: SearchParams = {}) {
    const { where, order } = AdvertisingRepository.createFilters({
      advertisingIds,
      externalId,
      finished,
      merchantId,
      sort
    })
    return this.find({
      where,
      order
    })
  }

  deleteById(id: string) {
    return this.updateById(id, { active: false })
  }
}
