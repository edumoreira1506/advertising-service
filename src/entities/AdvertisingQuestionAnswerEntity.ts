import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm'

import AdvertisingQuestion from './AdvertisingQuestionEntity'

@Entity('advertising_question_answers')
export default class AdvertisingQuestionAnswer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  externalId: string;

  @Column('boolean')
  active: boolean;

  @Column('varchar')
  content: string;

  @Column({ type: 'uuid', name: 'question_id'})
  questionId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => AdvertisingQuestion, advertisingQuestion => advertisingQuestion.answers)
  @JoinColumn({ name: 'question_id' })
  question: AdvertisingQuestion;
}
