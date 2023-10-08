import { Expose, Type } from 'class-transformer';

import { HomeTaskTypeModel } from './home-task-type.model';

export class HomeTaskModel {
	@Expose()
	id!: number;

	@Expose()
	@Type(() => HomeTaskTypeModel)
	task!: HomeTaskTypeModel;

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
