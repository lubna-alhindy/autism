import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePep3AnswerMigration1691356683865 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'pep3_answer',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'evaluation',
						type: 'enum',
						enum: ['unrealized', 'partially realized', 'realized', 'not evaluated'],
						isNullable: false
					},
					{
						name: 'pep3QuestionId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'pep3TestId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP'
					},
					{
						name: 'deletedAt',
						type: 'timestamp',
						isNullable: true
					}
				],
				foreignKeys: [
					{
						columnNames: ['pep3QuestionId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'pep3_question',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['pep3TestId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'pep3_test',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('pep3_answer');
	}
}
