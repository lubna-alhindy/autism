import {
	Entity,
	OneToOne,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Account, Child } from '../../../account-management';
import { Class } from './class.entity';

@Entity()
export class ClassChild {
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date | null;

	@Expose()
	@ManyToOne(() => Account, {
		nullable: true
	})
	createdBy!: Account;

	@Expose()
	@ManyToOne(() => Class, (cls) => cls.classChild)
	cls!: Class;

	@Expose()
	@OneToOne(() => Child, (child) => child.classChild, {
		nullable: true
	})
	@JoinColumn()
	child!: Child;
}
