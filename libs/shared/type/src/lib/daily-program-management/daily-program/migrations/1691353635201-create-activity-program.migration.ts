import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateActivityProgramMigration1691353635201 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'activity_program',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'programId',
						type: 'int',
						isNullable: false
					},
					{
						name: 'activityId',
						type: 'int',
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
						columnNames: ['programId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'program',
						onDelete: 'CASCADE'
					},
					{
						columnNames: ['activityId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'activity',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('activity_program');
	}
}
