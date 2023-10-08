import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMessageMigration1691352858411 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'message',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						length: '64',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid'
					},
					{
						name: 'subject',
						type: 'varchar',
						length: '512',
						charset: 'utf8',
						collation: 'utf8_general_ci',
						isNullable: true
					},
					{
						name: 'content',
						type: 'longtext',
						charset: 'utf8',
						collation: 'utf8_general_ci',
						isNullable: false
					},
					{
						name: 'isRead',
						type: 'boolean',
						default: false
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
						name: 'senderId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'receiverId',
						type: 'int',
						isNullable: false
					}
				],
				foreignKeys: [
					{
						columnNames: ['senderId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'account',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['receiverId'],
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
		await queryRunner.dropTable('message');
	}
}
