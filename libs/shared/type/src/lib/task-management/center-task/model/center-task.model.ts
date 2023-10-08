import { Expose, Type } from 'class-transformer';

import { CenterTaskTypeModel } from './center-task-type.model';

export class CenterTaskModel {
	@Expose()
	id!: number;

	@Expose()
	@Type(() => CenterTaskTypeModel)
	task!: CenterTaskTypeModel;

	@Expose()
	sessionNumber!: number;

	@Expose()
	taskType!: string;

	@Expose()
	taskName!: string;

	@Expose()
	teacherId!: number;

	@Expose()
	createdAt!: Date;
}
