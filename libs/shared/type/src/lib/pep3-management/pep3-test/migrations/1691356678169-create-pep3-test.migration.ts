import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePep3TestMigration1691356678169 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'pep3_test',
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
						name: 'bodyDescription',
						type: 'varchar',
						length: '512',
						isNullable: true,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'behaviorDescription',
						type: 'varchar',
						length: '512',
						isNullable: true,
						charset: 'utf8',
						collation: 'utf8_general_ci'
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
					},
					{
						name: 'childId',
						type: 'int',
						isNullable: false
					}
				],
				foreignKeys: [
					{
						columnNames: ['childId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'child',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('pep3_test');
	}
}
