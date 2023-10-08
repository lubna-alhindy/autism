import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Content } from '../../../content-management';
import { ActivityProgram } from './activity-program.entity';

@Entity()
export class Activity {
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
	@Column({
		nullable: false,
		type: 'int'
	})
	duration!: number;

	@Expose()
	@Column({
		type: 'time',
		nullable: false
	})
	time!: string;

	@Expose()
	@OneToMany(() => ActivityProgram, (activityProgram) => activityProgram.activity, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	activityProgram!: ActivityProgram[];

	@Expose()
	@ManyToOne(() => Content)
	content!: Content;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
