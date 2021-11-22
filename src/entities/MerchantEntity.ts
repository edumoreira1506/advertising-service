import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import Advertising from './AdvertisingEntity'

@Entity('merchants')
export default class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  externalId: string;

  @Column('boolean')
  active: boolean;

  @OneToMany(() => Advertising, advertising => advertising.merchant)
  advertisings?: Advertising[];
}
