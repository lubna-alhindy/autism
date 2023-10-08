import { Entity, PrimaryGeneratedColumn, DeleteDateColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management';

@Entity()
export class ChildWaitingTime {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@OneToOne(() => Child, (child) => child.childWaitingTime)
	@JoinColumn()
	child!: Child;

	@Column({
		type: 'int',
		nullable: false,
		default: 0
	})
	time!: number;

	@DeleteDateColumn()
	deletedAt!: Date | null;
}
