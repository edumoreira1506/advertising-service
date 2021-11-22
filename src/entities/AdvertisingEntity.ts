import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import Merchant from './MerchantEntity'

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

  @Column({ type: 'uuid', name: 'merchant_id'})
  merchantId: string;

  @ManyToOne(() => Merchant, merchant => merchant.advertisings)
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;
}
