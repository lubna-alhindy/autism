import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlanMigration1691356722295 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'plan',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'name',
						type: 'varchar',
						length: '512',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'childId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'pep3TestId',
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
						columnNames: ['childId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'child',
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
		await queryRunner.dropTable('plan');
	}
}
