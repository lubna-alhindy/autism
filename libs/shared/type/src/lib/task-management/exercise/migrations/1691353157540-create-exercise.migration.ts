import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateExerciseMigration1691353157540 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'exercise',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'exerciseRowId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'exerciseType',
						type: 'enum',
						enum: ['statement-composition', 'number-compare', 'number-order', 'matching', 'time'],
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
				]
			}),
			true
		);

		// Adding Index
		await queryRunner.createIndex(
			'exercise',
			new TableIndex({
				name: 'IDX_EXERCISE_EXERCISE_TYPE',
				columnNames: ['exerciseType']
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('exercise');
		if (table) {
			const index = table.indices.find((idx) => idx.columnNames.indexOf('exerciseType') !== -1);
			if (index) {
				await queryRunner.dropIndex('exercise', index);
			}
		}

		await queryRunner.dropTable('exercise');
	}
}
