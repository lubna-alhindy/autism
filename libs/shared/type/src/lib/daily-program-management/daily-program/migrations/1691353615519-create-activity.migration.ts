import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateActivityMigration1691353615519 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'activity',
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
						charset: 'utf8',
						collation: 'utf8_general_ci',
						isNullable: false,
						isUnique: true
					},
					{
						name: 'duration',
						type: 'int',
						isNullable: false
					},
					{
						name: 'time',
						type: 'time',
						isNullable: false
					},
					{
						name: 'contentId',
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
						name: 'updatedAt',
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
						columnNames: ['contentId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'content',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('activity');
	}
}
