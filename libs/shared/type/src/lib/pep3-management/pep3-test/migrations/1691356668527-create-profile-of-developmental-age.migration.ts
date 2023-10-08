import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProfileOfDevelopmentalAgeMigration1691356668527 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'profile_of_developmental_age',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'pep3DomainId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'domainAge',
						type: 'int',
						isNullable: false
					},
					{
						name: 'ageInMonths',
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
		await queryRunner.dropTable('profile_of_developmental_age');
	}
}
