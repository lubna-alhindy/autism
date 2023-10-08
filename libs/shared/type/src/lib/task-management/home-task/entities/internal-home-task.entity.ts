import { CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { InternalHomeTaskLog } from './internal-home-task-log.entity';
import { HomeTask } from './home-task.entity';
import { Exercise } from '../../exercise';

@Entity()
export class InternalHomeTask {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Exercise, (exercise) => exercise.internalHomeTask)
	exercise!: Exercise;

	@Expose()
	@OneToOne(() => HomeTask, (homeTask) => homeTask.internalHomeTask)
	@JoinColumn()
	homeTask!: HomeTask;

	@Expose()
	@OneToMany(() => InternalHomeTaskLog, (internalHomeTaskLog) => internalHomeTaskLog.internalHomeTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	internalHomeTaskLog!: InternalHomeTaskLog[];

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
