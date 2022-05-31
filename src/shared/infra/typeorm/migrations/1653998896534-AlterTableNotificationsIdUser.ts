import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableNotificationsIdUser1653998896534
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'notifications',
      'notifications_employee_FK'
    );
    await queryRunner.dropForeignKey(
      'notifications',
      'notifications_employer_FK'
    );

    await queryRunner.dropColumns('notifications', [
      'id_employee',
      'id_employer',
    ]);

    await queryRunner.addColumn(
      'notifications',
      new TableColumn({
        name: 'id_user',
        type: 'integer',
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        name: 'notifications_user_FK',
        referencedTableName: 'users',
        columnNames: ['id_user'],
        referencedColumnNames: ['id_user'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('notifications', 'notifications_user_FK');

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
