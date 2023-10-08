import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateChildMigration1691337594843 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'child',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'familyPassword',
						type: 'varchar',
						length: '255',
						isNullable: false
					},
					{
						name: 'motherName',
						type: 'varchar',
						length: '255',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'guardianName',
						type: 'varchar',
						length: '255',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
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
					},
					{
						name: 'accountId', 
						type: 'int',
						isNullable: false
					}
				],
				foreignKeys: [
					{
						columnNames: ['accountId'],
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
		await queryRunner.dropTable('child');
	}
}
