import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'

import Merchant from './MerchantEntity'
import AdvertisingQuestion from './AdvertisingQuestionEntity'
import AdvertisingFavorite from './AdvertisingFavoriteEntity'

@Entity('advertisings')
export default class Advertising {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('varchar')
    externalId: string

  @Column('boolean')
    active: boolean

  @Column('integer')
    price: number

  @Column('boolean')
    finished: boolean

  @Column({ type: 'uuid', name: 'merchant_id'})
    merchantId: string

  @Column('json')
    metadata: Record<string, any>

  @ManyToOne(() => Merchant, merchant => merchant.advertisings)
  @JoinColumn({ name: 'merchant_id' })
    merchant: Merchant

  @OneToMany(() => AdvertisingQuestion, advertisingQuestion => advertisingQuestion.advertising)
    questions?: AdvertisingQuestion[]

  @OneToMany(() => AdvertisingFavorite, advertisingFavorite => advertisingFavorite.advertising)
    favorites?: AdvertisingFavorite[]
}
