import { Expose, Type } from 'class-transformer';

import { ExerciseModel } from './exercise.model';

export class GetOneExerciseModel {
	@Expose()
	id!: number;

	@Expose()
	@Type(() => ExerciseModel)
	exercise!: ExerciseModel;

	@Expose()
	exerciseType!: string;

	@Expose()
	createdAt!: Date;
}
