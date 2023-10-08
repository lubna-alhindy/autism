import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateNeedMigration1691354038780 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'need',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'level',
						type: 'int',
						isNullable: false
					},
					{
						name: 'contentId',
						type: 'int',
						isNullable: true
					},
					{
						name: 'soundId',
						type: 'int',
						isNullable: true,
						default: null
					},
					{
						name: 'parentId',
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
						columnNames: ['contentId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'content',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['soundId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'content',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['parentId'],
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
		await queryRunner.dropTable('need');
	}
}
