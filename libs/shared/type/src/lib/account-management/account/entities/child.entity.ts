import {
	Entity,
	Column,
	OneToOne,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';

import {
	ChildHomeTask,
	ChildCenterTask,
	InternalHomeTaskLog,
	ExternalHomeTaskLog,
	InternalCenterTaskLog,
	ExternalCenterTaskLog
} from '../../../task-management';

import { ChildTimeExercise, ChildWaitingTime } from '../../../time-management';
import { ChildNeedLevel, ChildNeedLog } from '../../../needs-management';
import { CenterNote, FamilyNote } from '../../../note-management';
import { ProgramChild } from '../../../daily-program-management';
import { Pep3Test, Plan } from '../../../pep3-management';
import { ClassChild } from '../../../class-management';
import { Account } from './account.entity';

@Entity()
export class Child {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Column({
		nullable: false,
		type: 'varchar',
		length: '255'
	})
	familyPassword!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '255',
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	motherName!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '255',
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	guardianName!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@OneToOne(() => Account, (account) => account.child)
	@JoinColumn()
	account!: Account;

	@Expose()
	@OneToOne(() => ClassChild, (classChild) => classChild.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	classChild!: ClassChild;

	@Expose()
	@OneToOne(() => ChildNeedLevel, (childNeedLevel) => childNeedLevel.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childNeedLevel!: ChildNeedLevel;

	@Expose()
	@OneToMany(() => ChildNeedLog, (childNeedLog) => childNeedLog.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childNeedLog!: ChildNeedLog[];

	@Expose()
	@OneToMany(() => Pep3Test, (pep3Test) => pep3Test.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	pep3Test!: Pep3Test[];

	@Expose()
	@OneToMany(() => Plan, (plan) => plan.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	plan!: Plan[];

	@Expose()
	@OneToOne(() => ProgramChild, (programChild) => programChild.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	programChild!: ProgramChild;

	@Expose()
	@OneToMany(() => ChildCenterTask, (childCenterTask) => childCenterTask.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childCenterTask!: ChildCenterTask[];

	@Expose()
	@OneToMany(() => InternalCenterTaskLog, (internalCenterTaskLog) => internalCenterTaskLog.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	internalCenterTaskLog!: InternalCenterTaskLog[];

	@Expose()
	@OneToMany(() => ExternalCenterTaskLog, (externalCenterTaskLog) => externalCenterTaskLog.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	externalCenterTaskLog!: ExternalCenterTaskLog[];

	@Expose()
	@OneToMany(() => ChildHomeTask, (childHomeTask) => childHomeTask.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childHomeTask!: ChildHomeTask[];

	@Expose()
	@OneToMany(() => InternalHomeTaskLog, (internalHomeTaskLog) => internalHomeTaskLog.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	internalHomeTaskLog!: InternalHomeTaskLog[];

	@Expose()
	@OneToMany(() => ExternalHomeTaskLog, (externalHomeTaskLog) => externalHomeTaskLog.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	externalHomeTaskLog!: ExternalHomeTaskLog[];

	@Expose()
	@OneToMany(() => ChildTimeExercise, (childTimeExercise) => childTimeExercise.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childTimeExercise!: ChildTimeExercise[];

	@Expose()
	@OneToOne(() => ChildWaitingTime, (childWaitingTime) => childWaitingTime.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE',
		nullable: false
	})
	childWaitingTime!: ChildWaitingTime;

	@Expose()
	@OneToMany(() => CenterNote, (centerNote) => centerNote.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	centerNote!: CenterNote[];

	@Expose()
	@OneToMany(() => FamilyNote, (familyNote) => familyNote.child, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	familyNote!: FamilyNote[];

	validatePassword(password: string) {
		return bcrypt.compare(password, this.familyPassword);
	}
}
