import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { ChildTimeExercise } from './child-time-exercise.entity';

@Entity()
export class ChildTimeExerciseLog {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'boolean',
		nullable: false,
		default: false
	})
	status!: boolean;

	@Expose()
	@Column({
		nullable: false,
		type: 'int'
	})
	numOfTry!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'int'
	})
	time!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@ManyToOne(() => ChildTimeExercise, (childTimeExercise) => childTimeExercise.childTimeExerciseLog)
	childTimeExercise!: ChildTimeExercise;
}
