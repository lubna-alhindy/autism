import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTimeMigration1691358217027 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'time',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'mainTime',
						type: 'varchar',
						length: '255',
						isNullable: false
					},
					{
						name: 'time1',
						type: 'varchar',
						length: '255',
						isNullable: false
					},
					{
						name: 'time2',
						type: 'varchar',
						length: '255',
						isNullable: false
					},
					{
						name: 'time3',
						type: 'varchar',
						length: '255',
						isNullable: false
					},
					{
						name: 'answer',
						type: 'int',
						isNullable: false,
						default: 1
					},
					{
						name: 'type',
						type: 'enum',
						enum: ['digital', 'analog'],
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
		await queryRunner.dropTable('time');
	}
}
