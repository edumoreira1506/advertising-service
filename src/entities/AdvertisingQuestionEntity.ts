import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm'

import Advertising from './AdvertisingEntity'
import AdvertisingQuestionAnswer from './AdvertisingQuestionAnswerEntity'

@Entity('advertising_questions')
export default class AdvertisingQuestion {
  @PrimaryGeneratedColumn('uuid')
    id: string

  @Column('varchar')
    externalId: string

  @Column('boolean')
    active: boolean

  @Column('varchar')
    content: string

  @Column({ type: 'uuid', name: 'advertising_id'})
    advertisingId: string

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  @ManyToOne(() => Advertising, advertising => advertising.questions)
  @JoinColumn({ name: 'advertising_id' })
    advertising: Advertising

  @OneToMany(() => AdvertisingQuestionAnswer, a => a.question)
    answers?: AdvertisingQuestionAnswer[]
}
