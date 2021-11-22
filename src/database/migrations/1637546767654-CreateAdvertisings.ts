import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateAdvertisings1637546767654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'advertisings',
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
          name: 'merchant_id',
          type: 'uuid',
          isNullable: false,
        },
        {
          name: 'externalId',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'active',
          type: 'boolean',
          default: true
        },
        {
          name: 'price',
          type: 'integer',
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createForeignKey('advertisings', new TableForeignKey({
      columnNames: ['merchant_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'merchants',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('advertisings')
  }
}
