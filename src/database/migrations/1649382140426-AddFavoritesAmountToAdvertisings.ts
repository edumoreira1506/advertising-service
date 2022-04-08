import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddFavoritesAmountToAdvertisings1649382140426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('advertisings', new TableColumn({
      name: 'favorites_amount',
      type: 'integer',
      isNullable: true
    }))
  }
                    
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('advertisings', 'favorites_amount')
  }
}
