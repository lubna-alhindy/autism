import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management';
import { Need } from './need.entity';

@Entity()
export class ChildNeedLog {
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
	@ManyToOne(() => Child, (child) => child.childNeedLog)
	child!: Child;

	@Expose()
	@ManyToOne(() => Need, (need) => need.childNeedLog)
	need!: Need;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
