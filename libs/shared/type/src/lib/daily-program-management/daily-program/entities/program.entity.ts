import {
	Column,
	Entity,
	OneToMany,
	CreateDateColumn,
	DeleteDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { ActivityProgram } from './activity-program.entity';
import { ProgramChild } from './program-child.entity';

@Entity()
export class Program {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '512',
		unique: true,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	name!: string;

	@Expose()
	@OneToMany(() => ProgramChild, (programChild) => programChild.program, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	programChild!: ProgramChild[];

	@Expose()
	@OneToMany(() => ActivityProgram, (activityProgram) => activityProgram.program, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	activityProgram!: ActivityProgram[];

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
