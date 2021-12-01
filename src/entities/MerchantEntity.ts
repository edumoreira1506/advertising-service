import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
