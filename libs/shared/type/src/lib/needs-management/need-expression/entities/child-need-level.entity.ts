import {
	Entity,
	Column,
	OneToOne,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Account, Child } from '../../../account-management';

@Entity()
export class ChildNeedLevel {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@OneToOne(() => Child, (child) => child.childNeedLevel)
	@JoinColumn()
	child!: Child;

	@Expose()
	@Column({
		type: 'int',
		nullable: false
	})
	needLevel!: number;

	@Expose()
	@ManyToOne(() => Account, {
		nullable: true
	})
	createdBy!: Account;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
