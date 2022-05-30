import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableNotification1653950017273 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('notifications', 'id_employee');
    await queryRunner.dropColumn('notifications', 'id_employer');

    await queryRunner.addColumn(
      'notifications',
      new TableColumn({ name: 'id_user', type: 'integer', isNullable: false })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('notifications', 'id_user');

    await queryRunner.addColumns('notifications', [
      new TableColumn({
        name: 'id_employee',
        type: 'integer',
        isNullable: false,
      }),
      new TableColumn({
        name: 'id_employer',
        type: 'integer',
        isNullable: false,
      }),
    ]);
  }
}
