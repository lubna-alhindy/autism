import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTeacherMigration1691337623870 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'teacher',
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
		await queryRunner.dropTable('teacher');
	}
}
