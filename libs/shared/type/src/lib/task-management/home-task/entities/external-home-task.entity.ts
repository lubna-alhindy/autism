import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { ExternalHomeTaskLog } from './external-home-task-log.entity';
import { HomeTask } from './home-task.entity';

@Entity()
export class ExternalHomeTask {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@OneToOne(() => HomeTask, (homeTask) => homeTask.externalHomeTask)
	@JoinColumn()
	homeTask!: HomeTask;

	@Expose()
	@OneToMany(() => ExternalHomeTaskLog, (externalHomeTaskLog) => externalHomeTaskLog.externalHomeTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	externalHomeTaskLog!: ExternalHomeTaskLog[];

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
