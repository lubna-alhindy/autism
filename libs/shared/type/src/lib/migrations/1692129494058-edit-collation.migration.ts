import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class EditCollationMigration1692129494058 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'message',
			new TableColumn({
				name: 'new_subject',
				type: 'varchar',
				length: '512',
				charset: 'utf8mb4',
				collation: 'utf8mb4_unicode_ci',
				isNullable: true
			})
		);
		await queryRunner.query('UPDATE message SET new_subject = subject');
		await queryRunner.renameColumn('message', 'subject', 'old_subject');
		await queryRunner.renameColumn('message', 'new_subject', 'subject');
		await queryRunner.dropColumn('message', 'old_subject');

		await queryRunner.addColumn(
			'message',
			new TableColumn({
				name: 'new_content',
				type: 'longtext',
				charset: 'utf8mb4',
				collation: 'utf8mb4_unicode_ci',
				isNullable: false
			})
		);
		await queryRunner.query('UPDATE message SET new_content = content');
		await queryRunner.renameColumn('message', 'content', 'old_content');
		await queryRunner.renameColumn('message', 'new_content', 'content');
		await queryRunner.dropColumn('message', 'old_content');

		await queryRunner.addColumn(
			'center_task',
			new TableColumn({
				name: 'new_taskName',
				type: 'varchar',
				length: '64',
				charset: 'utf8',
				collation: 'utf8_general_ci',
				isNullable: false
			})
		);
		await queryRunner.query('UPDATE center_task SET new_taskName = taskName');
		await queryRunner.renameColumn('center_task', 'taskName', 'old_taskName');
		await queryRunner.renameColumn('center_task', 'new_taskName', 'taskName');
		await queryRunner.dropColumn('center_task', 'old_taskName');

		await queryRunner.addColumn(
			'external_center_task_log',
			new TableColumn({
				name: 'new_note',
				type: 'varchar',
				length: '512',
				charset: 'utf8',
				collation: 'utf8_general_ci',
				isNullable: true
			})
		);
		await queryRunner.query('UPDATE external_center_task_log SET new_note = note');
		await queryRunner.renameColumn('external_center_task_log', 'note', 'old_note');
		await queryRunner.renameColumn('external_center_task_log', 'new_note', 'note');
		await queryRunner.dropColumn('external_center_task_log', 'old_note');

		await queryRunner.addColumn(
			'home_task',
			new TableColumn({
				name: 'new_taskName',
				type: 'varchar',
				length: '64',
				charset: 'utf8',
				collation: 'utf8_general_ci',
				isNullable: false
			})
		);
		await queryRunner.query('UPDATE home_task SET new_taskName = taskName');
		await queryRunner.renameColumn('home_task', 'taskName', 'old_taskName');
		await queryRunner.renameColumn('home_task', 'new_taskName', 'taskName');
		await queryRunner.dropColumn('home_task', 'old_taskName');

		await queryRunner.addColumn(
			'external_home_task_log',
			new TableColumn({
				name: 'new_note',
				type: 'varchar',
				length: '512',
				charset: 'utf8',
				collation: 'utf8_general_ci',
				isNullable: true
			})
		);
		await queryRunner.query('UPDATE external_home_task_log SET new_note = note');
		await queryRunner.renameColumn('external_home_task_log', 'note', 'old_note');
		await queryRunner.renameColumn('external_home_task_log', 'new_note', 'note');
		await queryRunner.dropColumn('external_home_task_log', 'old_note');

		await queryRunner.query("UPDATE permission SET `key` = 'DeletePlan' WHERE id = 133;");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		return;
	}
}
