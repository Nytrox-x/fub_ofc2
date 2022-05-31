import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableNotification1650894207634
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          {
            name: 'id_notification',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'id_employee',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'id_employer',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'id_contract',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'notifications_employee_FK',
            referencedTableName: 'users',
            columnNames: ['id_employee'],
            referencedColumnNames: ['id_user'],
          },
          {
            name: 'notifications_employer_FK',
            referencedTableName: 'users',
            columnNames: ['id_employer'],
            referencedColumnNames: ['id_user'],
          },
          {
            name: 'notifications_contract_FK',
            referencedTableName: 'contracts',
            columnNames: ['id_contract'],
            referencedColumnNames: ['id_contract'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications');
  }
}
