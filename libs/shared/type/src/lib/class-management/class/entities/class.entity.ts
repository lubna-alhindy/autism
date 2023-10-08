import {
	Entity,
	Column,
	OneToMany,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ClassSpecialist } from './class-specialist.entity';
import { Account } from '../../../account-management';
import { ClassTeacher } from './class-teacher.entity';
import { ClassChild } from './class-child.entity';
import { ClassLevel } from '../enum';

@Entity()
export class Class {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64',
		unique: true,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	name!: string;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(ClassLevel),
		nullable: false
	})
	level!: string;

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

	@Expose()
	@OneToMany(() => ClassSpecialist, (classSpecialist) => classSpecialist.cls, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	classSpecialist!: ClassSpecialist[];

	@Expose()
	@OneToMany(() => ClassTeacher, (classTeacher) => classTeacher.cls, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	classTeacher!: ClassTeacher[];

	@Expose()
	@OneToMany(() => ClassChild, (classChild) => classChild.cls, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	classChild!: ClassChild[];
}
