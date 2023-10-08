import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChildNeedLevelMigration1691354051658 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'child_need_level',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'needLevel',
						type: 'int',
						isNullable: false
					},
					{
						name: 'childId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'createdById',
						type: 'int',
						isNullable: true
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
						columnNames: ['childId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'child',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['createdById'],
						referencedColumnNames: ['id'],
						referencedTableName: 'account',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('child_need_level');
	}
}
