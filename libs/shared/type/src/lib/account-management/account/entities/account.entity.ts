import {
	Entity,
	Column,
	OneToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { Message } from '../../../communication-management';
import { AccountType } from '../enums/account-type.enum';
import { Supervisor } from './supervisor.entity';
import { Specialist } from './specialist.entity';
import { Teacher } from './teacher.entity';
import { Profile } from '../../profile';
import { Child } from './child.entity';

@Entity()
export class Account {
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
		unique: true
	})
	email!: string;

	@Column({
		nullable: false,
		type: 'varchar',
		length: '255'
	})
	password!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64',
		unique: true,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	userName!: string;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(AccountType),
		nullable: false
	})
	accountType!: string;

	@Expose()
	@Column({
		type: 'boolean',
		nullable: false,
		default: false
	})
	isBlocked!: boolean;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@OneToOne(() => Profile, (profile) => profile.account, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	profile!: Profile;

	@Expose()
	@OneToOne(() => Child, (child) => child.account, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	child!: Child;

	@Expose()
	@OneToOne(() => Supervisor, (supervisor) => supervisor.account, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	supervisor!: Supervisor;

	@Expose()
	@OneToOne(() => Specialist, (specialist) => specialist.account, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	specialist!: Specialist;

	@Expose()
	@OneToOne(() => Teacher, (teacher) => teacher.account, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	teacher!: Teacher;

	@Expose()
	@OneToMany(() => Message, (message) => message.sender, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	sentMessage!: Message[];

	@Expose()
	@OneToMany(() => Message, (message) => message.receiver, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	receivedMessage!: Message[];

	async validatePassword(password: string) {
		return await bcrypt.compare(password, this.password);
	}
}

// this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
