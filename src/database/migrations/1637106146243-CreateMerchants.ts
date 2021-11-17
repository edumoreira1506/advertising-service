import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMerchants1637106146243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await queryRunner.createTable(new Table({
      name: 'merchants',
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
          name: 'externalId',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'active',
          type: 'boolean',
          default: true
        }
      ]
    }), true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('merchants')
    await queryRunner.query('DROP EXTENSION "uuid-ossp"')
  }
}
