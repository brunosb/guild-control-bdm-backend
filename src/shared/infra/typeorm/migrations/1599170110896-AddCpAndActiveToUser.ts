import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCpAndActiveToUser1599170110896
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cp',
        type: 'integer',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'active');
    await queryRunner.dropColumn('users', 'cp');
  }
}
