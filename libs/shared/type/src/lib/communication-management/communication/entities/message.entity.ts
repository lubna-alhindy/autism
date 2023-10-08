import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Account } from '../../../account-management';

@Entity()
export class Message {
	@Expose()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '512',
		charset: 'utf8mb4',
		collation: 'utf8mb4_unicode_ci',
	})
	subject!: string;

	@Expose()
	@Column({
		type: 'longtext',
		nullable: false,
		charset: 'utf8mb4',
		collation: 'utf8mb4_unicode_ci',
	})
	content!: string;

	@Expose()
	@Column({
		type: 'boolean',
		nullable: false,
		default: false
	})
	isRead!: boolean;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@ManyToOne(() => Account, (account) => account.sentMessage)
	sender!: Account;

	@Expose()
	@ManyToOne(() => Account, (account) => account.receivedMessage)
	receiver!: Account;
}
