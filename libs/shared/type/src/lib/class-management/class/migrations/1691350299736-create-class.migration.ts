import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClassMigration1691350299736 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'class',
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
						length: '64',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci',
						isUnique: true
					},
					{
						name: 'level',
						type: 'enum',
						enum: ['level 1', 'level 2', 'level 3'],
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
						default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
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
		await queryRunner.dropTable('class');
	}
}
