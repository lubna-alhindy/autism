import { Expose } from 'class-transformer';

import { HomeTaskModel } from './home-task.model';

export class InternalHomeTaskLogModel {
	@Expose()
	status!: boolean;

	@Expose()
	totalTries!: number;

	@Expose()
	totalTime!: number;

	@Expose()
	homeTask!: HomeTaskModel;
}
