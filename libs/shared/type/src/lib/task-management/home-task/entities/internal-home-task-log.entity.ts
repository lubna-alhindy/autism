import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management';
import { InternalHomeTask } from './internal-home-task.entity';

@Entity()
export class InternalHomeTaskLog {
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
	@ManyToOne(() => Child, (child) => child.internalHomeTaskLog)
	child!: Child;

	@Expose()
	@ManyToOne(() => InternalHomeTask, (internalHomeTask) => internalHomeTask.internalHomeTaskLog)
	internalHomeTask!: InternalHomeTask;
}
