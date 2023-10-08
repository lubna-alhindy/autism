import {
	Entity,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
	DeleteDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Account } from './account.entity';

@Entity()
export class Supervisor {
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
	@OneToOne(() => Account, (account) => account.supervisor)
	@JoinColumn()
	account!: Account;
}
