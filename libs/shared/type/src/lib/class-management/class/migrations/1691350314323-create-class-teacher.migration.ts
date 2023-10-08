import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateClassTeacherMigration1691350314323 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'class_teacher',
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
						name: 'teacherId',
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
						columnNames: ['teacherId'],
						referencedColumnNames: ['id'],
						referencedTableName: 'teacher',
						onDelete: 'CASCADE'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('class_teacher');
	}
}
