import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGoalMigration1691356728640 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'goal',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'technique',
						type: 'enum',
						enum: ['optical', 'physical', 'verbal'],
						isNullable: true
					},
					{
						name: 'evaluation',
						type: 'enum',
						enum: ['unrealized', 'partially realized', 'realized', 'not evaluated'],
						isNullable: false,
						default: "'not evaluated'"
					},
					{
						name: 'note',
						type: 'varchar',
						length: '512',
						isNullable: true,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'motivation',
						type: 'varchar',
						length: '512',
						isNullable: true,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'planId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'pep3QuestionId',
						type: 'int',
						isNullable: true
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						isNullable: false,
						default: 'CURRENT_TIMESTAMP'
					},
					{
						name: 'updatedAt',
						type: 'timestamp',
						isNullable: false,
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
						columnNames: ['planId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'plan',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['pep3QuestionId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'pep3_question',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('goal');
	}
}
