import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddMetadataToAdvertisings1649189446222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('advertisings', new TableColumn({
      name: 'metadata',
      type: 'json',
      isNullable: true
    }))
  }
                    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('advertisings', 'metadata')
  }
}
