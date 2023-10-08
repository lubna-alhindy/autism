import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Account, Specialist } from '../../../account-management';
import { Class } from './class.entity';

@Entity()
export class ClassSpecialist {
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
	@ManyToOne(() => Class, (cls) => cls.classSpecialist)
	cls!: Class;

	@Expose()
	@ManyToOne(() => Specialist, (specialist) => specialist.classSpecialist)
	specialist!: Specialist;
}
