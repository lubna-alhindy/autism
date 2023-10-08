import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePermissionMigration1691339125118 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'permission',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'name',
						type: 'varchar',
						length: '255',
						isNullable: false
					},
					{
						name: 'method',
						type: 'varchar',
						length: '64',
						isNullable: false
					},
					{
						name: 'key',
						type: 'varchar',
						length: '255',
						isNullable: true
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('permission');
	}
}
