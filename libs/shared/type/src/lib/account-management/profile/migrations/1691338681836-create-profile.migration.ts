import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProfileMigration1691338681836 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'profile',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'firstName',
						type: 'varchar',
						length: '64',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'lastName',
						type: 'varchar',
						length: '64',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'middleName',
						type: 'varchar',
						length: '64',
						isNullable: true,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'nationality',
						type: 'varchar',
						length: '64',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'homeAddress',
						type: 'varchar',
						length: '64',
						isNullable: false,
						charset: 'utf8',
						collation: 'utf8_general_ci'
					},
					{
						name: 'image',
						type: 'varchar',
						length: '512',
						isNullable: true
					},
					{
						name: 'birthday',
						type: 'date',
						isNullable: true
					},
					{
						name: 'phoneNumber',
						type: 'varchar',
						length: '10',
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
		await queryRunner.dropTable('profile');
	}
}
