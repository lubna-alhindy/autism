import { Expose } from 'class-transformer';

import { CenterTaskModel } from './center-task.model';

export class ExternalCenterTaskLogModel {
	@Expose()
	id!: number;

	@Expose()
	childPerformance!: string;

	@Expose()
	note!: string;

	@Expose()
	centerTask!: CenterTaskModel;
}
