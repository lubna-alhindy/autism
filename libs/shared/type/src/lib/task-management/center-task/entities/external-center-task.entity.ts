import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { ExternalCenterTaskLog } from './external-center-task-log.entity';
import { CenterTask } from './center-task.entity';

@Entity()
export class ExternalCenterTask {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@OneToOne(() => CenterTask, (centerTask) => centerTask.externalCenterTask)
	@JoinColumn()
	centerTask!: CenterTask;

	@Expose()
	@OneToMany(() => ExternalCenterTaskLog, (externalCenterTaskLog) => externalCenterTaskLog.externalCenterTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	externalCenterTaskLog!: ExternalCenterTaskLog[];

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
