import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFinishedToAdvertising1643561311076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('advertisings', new TableColumn({
      name: 'finished',
      type: 'boolean',
      default: false
    }))
  }
                    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('advertisings', 'finished')
  }
}
