import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClassChildMigration1691350309162 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'class_child',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
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
					},
					{
						name: 'createdById',
						type: 'int',
						isNullable: true
					},
					{
						name: 'clsId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'childId',
						type: 'int',
						isNullable: false
					}
				],
				foreignKeys: [
					{
						columnNames: ['createdById'],
						referencedColumnNames: ['id'],
						referencedTableName: 'account',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['clsId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'class',
						onDelete: 'CASCADE'
					},
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
		await queryRunner.dropTable('class_child');
	}
}
