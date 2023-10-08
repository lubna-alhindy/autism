import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChildNeedLogMigration1691354057887 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'child_need_log',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'status',
						type: 'boolean',
						default: false,
						isNullable: false
					},
					{
						name: 'childId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'needId',
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
						columnNames: ['childId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'child',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['needId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'need',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('child_need_log');
	}
}
