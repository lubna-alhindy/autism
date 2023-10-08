import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Account, Teacher } from '../../../account-management';
import { Class } from './class.entity';

@Entity()
export class ClassTeacher {
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@ManyToOne(() => Account, {
		nullable: true
	})
	createdBy!: Account;

	@Expose()
	@ManyToOne(() => Class, (cls) => cls.classTeacher)
	cls!: Class;

	@Expose()
	@ManyToOne(() => Teacher, (teacher) => teacher.classTeacher)
	teacher!: Teacher;
}
