import { DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management';
import { CenterTask } from './center-task.entity';

@Entity()
export class ChildCenterTask {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Child, (child) => child.childCenterTask)
	child!: Child;

	@Expose()
	@ManyToOne(() => CenterTask, (centerTask) => centerTask.childCenterTask)
	centerTask!: CenterTask;

	@DeleteDateColumn()
	deletedAt!: Date;
}
