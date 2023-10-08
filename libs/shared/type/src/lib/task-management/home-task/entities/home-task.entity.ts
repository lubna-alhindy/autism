import { Column, Entity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ManyToOne, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';
import { Teacher } from '../../../account-management';
import { InternalHomeTask } from './internal-home-task.entity';
import { ChildHomeTask } from './child-home-task.entity';
import { ExternalHomeTask } from './external-home-task.entity';
import { HomeTaskType } from '../enums';

@Entity()
export class HomeTask {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(HomeTaskType),
		nullable: false
	})
	taskType!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	taskName!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'int'
	})
	sessionNumber!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@ManyToOne(() => Teacher, (teacher) => teacher.homeTask)
	teacher!: Teacher;

	@Expose()
	@OneToOne(() => ExternalHomeTask, (externalHomeTask) => externalHomeTask.homeTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	externalHomeTask!: ExternalHomeTask;

	@Expose()
	@OneToOne(() => InternalHomeTask, (internalHomeTask) => internalHomeTask.homeTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	internalHomeTask!: InternalHomeTask;

	@Expose()
	@OneToMany(() => ChildHomeTask, (childHomeTask) => childHomeTask.homeTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childHomeTask!: ChildHomeTask[];
}
