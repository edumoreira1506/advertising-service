import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateAdvertisingQuestionAnswers1643072476584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'advertising_question_answers',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
          isNullable: false,
        },
        {
          name: 'question_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'active',
          type: 'boolean',
          default: true
        },
        {
          name: 'content',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP(6)'
        },
        {
          name: 'externalId',
          type: 'varchar',
          isNullable: false
        },
      ]
    }), true)

    await queryRunner.createForeignKey('advertising_question_answers', new TableForeignKey({
      columnNames: ['question_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'advertising_questions',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('advertising_question_answers')
  }
}
