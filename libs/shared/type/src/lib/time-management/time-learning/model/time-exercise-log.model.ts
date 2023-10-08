import { Expose } from 'class-transformer';

import { GetOneExerciseModel } from '../../../task-management';

export class TimeExerciseLogModel {
	@Expose()
	status!: boolean;

	@Expose()
	totalTries!: number;

	@Expose()
	totalTime!: number;

	@Expose()
	timeExercise!: GetOneExerciseModel;
}
