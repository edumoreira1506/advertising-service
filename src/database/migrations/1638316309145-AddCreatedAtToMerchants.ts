import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddCreatedAtToMerchants1638316309145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('merchants', new TableColumn({
      name: 'created_at',
      type: 'timestamp',
      default: 'CURRENT_TIMESTAMP(6)'
    }))
  }
                
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('merchants', 'created_at')
  }
}
