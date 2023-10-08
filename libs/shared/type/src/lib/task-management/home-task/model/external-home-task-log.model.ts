import { Expose } from 'class-transformer';

import { HomeTaskModel } from './home-task.model';

export class ExternalHomeTaskLogModel {
	@Expose()
	id!: number;

	@Expose()
	childPerformance!: string;

	@Expose()
	note!: string;

	@Expose()
	homeTask!: HomeTaskModel;
}
