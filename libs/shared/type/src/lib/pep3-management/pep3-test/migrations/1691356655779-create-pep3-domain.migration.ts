import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePep3DomainMigration1691356655779 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'pep3_domain',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'domain',
						type: 'varchar',
						length: '512',
						isNullable: false,
						isUnique: true,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('pep3_domain');
	}
}
