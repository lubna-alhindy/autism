import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExternalCenterTaskMigration1691360200407 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// Create the ExternalCenterTask table
		await queryRunner.createTable(
			new Table({
				name: 'external_center_task',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'centerTaskId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
						isNullable: false
					},
					{
						name: 'deletedAt',
						type: 'timestamp',
						isNullable: true
					}
				],
				foreignKeys: [
					{
						columnNames: ['centerTaskId'],
						referencedTableName: 'center_task',
						referencedColumnNames: ['id'],
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('external_center_task');
	}
}
