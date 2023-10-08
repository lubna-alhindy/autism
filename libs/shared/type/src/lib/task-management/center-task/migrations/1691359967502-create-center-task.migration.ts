import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCenterTaskMigration1691359967502 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'center_task',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'taskType',
						type: 'enum',
						enum: ['internal-task', 'external-task'],
						isNullable: false
					},
					{
						name: 'taskName',
						type: 'varchar',
						length: '64',
						isNullable: false
					},
					{
						name: 'sessionNumber',
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
					},
					{
						name: 'teacherId',
						type: 'int',
						isNullable: false
					}
				],
				foreignKeys: [
					{
						columnNames: ['teacherId'],
						referencedTableName: 'teacher',
						referencedColumnNames: ['id'],
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('center_task');
	}
}
