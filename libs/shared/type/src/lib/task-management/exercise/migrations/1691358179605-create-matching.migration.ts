import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMatchingMigration1691358179605 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'matching',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'mainContentId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'content1Id',
						type: 'int',
						isNullable: false
					},
					{
						name: 'content2Id',
						type: 'int',
						isNullable: false
					},
					{
						name: 'content3Id',
						type: 'int',
						isNullable: false
					},
					{
						name: 'answer',
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
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('matching');
	}
}
