import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExternalHomeTaskLogMigration1691360206133 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'external_home_task_log',
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
						name: 'externalHomeTaskId',
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
						columnNames: ['externalHomeTaskId'],
						referencedTableName: 'external_home_task',
						referencedColumnNames: ['id'],
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('external_home_task_log');
	}
}
