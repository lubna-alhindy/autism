import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePep3AgeMigration1691356689048 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'pep3_age',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'pep3TestId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'pep3DomainId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'age',
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
						columnNames: ['pep3TestId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'pep3_test',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['pep3DomainId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'pep3_domain',
						onDelete: 'CASCADE'
					}
				],
				indices: [
					{
						name: 'IDX_pep3_age_test_id',
						columnNames: ['pep3TestId']
					},
					{
						name: 'IDX_pep3_age_domain_id',
						columnNames: ['pep3DomainId']
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('pep3_age');
	}
}
