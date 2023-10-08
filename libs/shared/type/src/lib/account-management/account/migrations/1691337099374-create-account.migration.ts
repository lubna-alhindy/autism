import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAccountMigration1691337099374 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'account',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'email',
						type: 'varchar',
						length: '64',
						isNullable: false,
						isUnique: true
					},
					{
						name: 'password',
						type: 'varchar',
						length: '255',
						isNullable: false
					},
					{
						name: 'userName',
						type: 'varchar',
						length: '64',
						isNullable: false,
						isUnique: true,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'accountType',
						type: 'enum',
						enum: ['supervisor', 'specialist', 'teacher', 'child'],
						isNullable: false
					},
					{
						name: 'isBlocked',
						type: 'boolean',
						default: false,
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
						default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
						isNullable: false
					},
					{
						name: 'deletedAt',
						type: 'timestamp',
						isNullable: true
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('account');
	}
}
