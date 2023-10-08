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

import { ClassSpecialist } from '../../../class-management';
import { Account } from './account.entity';

@Entity()
export class Specialist {
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
	@OneToOne(() => Account, (account) => account.specialist)
	@JoinColumn()
	account!: Account;

	@Expose()
	@OneToMany(() => ClassSpecialist, (classSpecialist) => classSpecialist.specialist, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	classSpecialist!: ClassSpecialist[];
}
