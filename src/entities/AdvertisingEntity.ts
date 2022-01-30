import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm'

import Merchant from './MerchantEntity'
import AdvertisingQuestion from './AdvertisingQuestionEntity'

@Entity('advertisings')
export default class Advertising {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  externalId: string;

  @Column('boolean')
  active: boolean;

  @Column('integer')
  price: number;

  @Column('boolean')
  finished: boolean;

  @Column({ type: 'uuid', name: 'merchant_id'})
  merchantId: string;

  @ManyToOne(() => Merchant, merchant => merchant.advertisings)
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

  @OneToMany(() => AdvertisingQuestion, advertisingQuestion => advertisingQuestion.advertising)
  questions?: AdvertisingQuestion[];
}
