import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChildTimeExerciseLogMigration1691354831543 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'child_time_exercise_log',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
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
					},
					{
						name: 'childTimeExerciseId',
						type: 'int',
						isNullable: false
					}
				],
				foreignKeys: [
					{
						columnNames: ['childTimeExerciseId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'child_time_exercise',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('child_time_exercise_log');
	}
}
