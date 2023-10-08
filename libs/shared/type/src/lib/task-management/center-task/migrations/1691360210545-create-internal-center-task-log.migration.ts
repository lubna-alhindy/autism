import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInternalCenterTaskLogMigration1691360210545 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'internal_center_task_log',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'childId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'internalCenterTaskId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'status',
						type: 'boolean',
						default: false,
						isNullable: false
					},
					{
						name: 'numOfTry',
						type: 'int',
						isNullable: false
					},
					{
						name: 'time',
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
						columnNames: ['childId'],
						referencedTableName: 'child',
						referencedColumnNames: ['id'],
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['internalCenterTaskId'],
						referencedTableName: 'internal_center_task',
						referencedColumnNames: ['id'],
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('internal_center_task_log');
	}
}
