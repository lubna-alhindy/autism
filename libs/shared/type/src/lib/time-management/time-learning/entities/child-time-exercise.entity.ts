import { Entity, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { ManyToOne } from 'typeorm';

import { ChildTimeExerciseLog } from './child-time-exercise-log.entity';
import { Child } from '../../../account-management';
import { Exercise } from '../../../task-management';

@Entity()
export class ChildTimeExercise {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Child, (child) => child.childTimeExercise)
	child!: Child;

	@Expose()
	@ManyToOne(() => Exercise, (exercise) => exercise.childTimeExercise)
	exercise!: Exercise;

	@Expose()
	@OneToMany(() => ChildTimeExerciseLog, (childTimeExerciseLog) => childTimeExerciseLog.childTimeExercise, {
		nullable: false,
		onDelete: 'CASCADE',
		cascade: ['soft-remove']
	})
	childTimeExerciseLog!: ChildTimeExerciseLog[];

	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
