import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { TimeExerciseType } from '../enums';

@Entity()
export class Time {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: 255
	})
	mainTime!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: 255
	})
	time1!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: 255
	})
	time2!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: 255
	})
	time3!: string;

	@Expose()
	@Column({
		nullable: false,
		default: 1
	})
	answer!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(TimeExerciseType),
		nullable: false
	})
	type!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
