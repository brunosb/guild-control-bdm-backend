import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateClasses1598744682490 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'classes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name_ascension',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name_awakening',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'avatar_ascension',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'avatar_awakening',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('classes');
  }
}
