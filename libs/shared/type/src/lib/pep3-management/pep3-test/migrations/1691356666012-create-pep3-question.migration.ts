import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePep3QuestionMigration1691356666012 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'pep3_question',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'question',
						type: 'varchar',
						length: '512',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'goal',
						type: 'varchar',
						length: '512',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'pep3DomainId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP'
					}
				],
				foreignKeys: [
					{
						columnNames: ['pep3DomainId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'pep3_domain',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('pep3_question');
	}
}
