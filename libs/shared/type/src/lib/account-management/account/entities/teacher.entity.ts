import {
	Entity,
	OneToOne,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { HomeTask, CenterTask } from '../../../task-management';
import { ClassTeacher } from '../../../class-management';
import { Account } from './account.entity';

@Entity()
export class Teacher {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@OneToOne(() => Account, (account) => account.teacher)
	@JoinColumn()
	account!: Account;

	@Expose()
	@OneToMany(() => ClassTeacher, (classTeacher) => classTeacher.teacher, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	classTeacher!: ClassTeacher[];

	@Expose()
	@OneToMany(() => CenterTask, (centerTask) => centerTask.teacher, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	centerTask!: CenterTask[];

	@Expose()
	@OneToMany(() => HomeTask, (homeTask) => homeTask.teacher, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	homeTask!: HomeTask[];
}
