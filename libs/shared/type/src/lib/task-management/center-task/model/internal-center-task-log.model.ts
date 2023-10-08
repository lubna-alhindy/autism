import { Expose } from 'class-transformer';

import { CenterTaskModel } from './center-task.model';

export class InternalCenterTaskLogModel {
	@Expose()
	status!: boolean;

	@Expose()
	totalTries!: number;

	@Expose()
	totalTime!: number;

	@Expose()
	centerTask!: CenterTaskModel;
}
