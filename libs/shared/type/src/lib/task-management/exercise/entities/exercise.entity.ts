import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ChildTimeExercise } from '../../../time-management';
import { InternalCenterTask } from '../../center-task';
import { InternalHomeTask } from '../../home-task';
import { ExerciseType } from '../enums';

@Entity()
export class Exercise {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'int',
		nullable: false
	})
	exerciseRowId!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(ExerciseType),
		nullable: false
	})
	exerciseType!: string;

	@Expose()
	@OneToMany(() => InternalCenterTask, (internalTask) => internalTask.exercise, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	internalCenterTask!: InternalCenterTask[];

	@Expose()
	@OneToMany(() => InternalHomeTask, (internalHomeTask) => internalHomeTask.exercise, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	internalHomeTask!: InternalHomeTask[];

	@Expose()
	@OneToMany(() => ChildTimeExercise, (childTimeExercise) => childTimeExercise.exercise, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childTimeExercise!: ChildTimeExercise[];

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
