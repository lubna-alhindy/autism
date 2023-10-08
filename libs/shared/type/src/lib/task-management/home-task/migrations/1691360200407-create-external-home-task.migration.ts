import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExternalHomeTaskMigration1691360200407 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// Create the ExternalHomeTask table
		await queryRunner.createTable(
			new Table({
				name: 'external_home_task',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'homeTaskId',
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
		await queryRunner.dropTable('external_home_task');
	}
}
