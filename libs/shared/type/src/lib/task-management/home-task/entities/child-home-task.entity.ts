import { DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management';
import { HomeTask } from './home-task.entity';

@Entity()
export class ChildHomeTask {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Child, (child) => child.childHomeTask)
	child!: Child;

	@Expose()
	@ManyToOne(() => HomeTask, (homeTask) => homeTask.childHomeTask)
	homeTask!: HomeTask;

	@DeleteDateColumn()
	deletedAt!: Date;
}
