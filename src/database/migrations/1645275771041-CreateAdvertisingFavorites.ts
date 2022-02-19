import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateAdvertisingFavorites1645275771041
implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'advertising_favorites',
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
            name: 'advertising_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'externalId',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true
    )

    await queryRunner.createForeignKey(
      'advertising_favorites',
      new TableForeignKey({
        columnNames: ['advertising_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'advertisings',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('advertising_favorites')
  }
}
