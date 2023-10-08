import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExternalCenterTaskLogMigration1691360206133 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'external_center_task_log',
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
						name: 'externalCenterTaskId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'childPerformance',
						type: 'enum',
						enum: ['unrealized', 'partially realized', 'realized', 'not evaluated'],
						default: "'not evaluated'",
						isNullable: false
					},
					{
						name: 'note',
						type: 'varchar',
						length: '128',
						isNullable: true
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
						columnNames: ['externalCenterTaskId'],
						referencedTableName: 'external_center_task',
						referencedColumnNames: ['id'],
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('external_center_task_log');
	}
}
