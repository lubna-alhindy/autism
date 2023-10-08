import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { InternalCenterTask } from './internal-center-task.entity';
import { Child } from '../../../account-management';

@Entity()
export class InternalCenterTaskLog {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'boolean',
		nullable: false,
		default: false
	})
	status!: boolean;

	@Expose()
	@Column({
		nullable: false,
		type: 'int'
	})
	numOfTry!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'int'
	})
	time!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@ManyToOne(() => Child, (child) => child.internalCenterTaskLog)
	child!: Child;

	@Expose()
	@ManyToOne(() => InternalCenterTask, (internalCenterTask) => internalCenterTask.internalCenterTaskLog)
	internalCenterTask!: InternalCenterTask;
}
