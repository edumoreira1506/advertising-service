import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('merchants')
export default class Merchant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  externalId: string;

  @Column('boolean')
  active: boolean;
}
