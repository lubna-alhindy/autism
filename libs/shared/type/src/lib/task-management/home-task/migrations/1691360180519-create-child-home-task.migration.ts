import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChildHomeTaskMigration1691360180519 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'child_home_task',
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
						name: 'homeTaskId',
						type: 'int',
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
						columnNames: ['homeTaskId'],
						referencedTableName: 'home_task',
						referencedColumnNames: ['id'],
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('child_home_task');
	}
}
