import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRolePermissionMigration1691339132225 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'role_permission',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'roleId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'permissionId',
						type: 'int',
						isNullable: false
					}
				],
				foreignKeys: [
					{
						columnNames: ['roleId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'role',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['permissionId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'permission',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('role_permission');
	}
}
