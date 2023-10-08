import {
	Column,
	Entity,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Account } from '../../account';

@Entity()
export class Profile {
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
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	firstName!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	lastName!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '64',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	middleName!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64',
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	nationality!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64',
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	homeAddress!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '512'
	})
	image!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'date'
	})
	birthday!: Date;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '10'
	})
	phoneNumber!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@OneToOne(() => Account, (account) => account.profile)
	@JoinColumn()
	account!: Account;
}
