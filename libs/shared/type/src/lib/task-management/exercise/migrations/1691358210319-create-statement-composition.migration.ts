import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatementCompositionMigration1691358210319 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'statement_composition',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'statement',
						type: 'varchar',
						length: '512',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('statement_composition');
	}
}
