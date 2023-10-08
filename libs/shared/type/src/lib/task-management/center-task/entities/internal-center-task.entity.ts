import { CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { InternalCenterTaskLog } from './internal-center-task-log.entity';
import { CenterTask } from './center-task.entity';
import { Exercise } from '../../exercise';

@Entity()
export class InternalCenterTask {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Exercise, (exercise) => exercise.internalCenterTask)
	exercise!: Exercise;

	@Expose()
	@OneToOne(() => CenterTask, (centerTask) => centerTask.internalCenterTask)
	@JoinColumn()
	centerTask!: CenterTask;

	@Expose()
	@OneToMany(() => InternalCenterTaskLog, (internalCenterTaskLog) => internalCenterTaskLog.internalCenterTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	internalCenterTaskLog!: InternalCenterTaskLog[];

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
