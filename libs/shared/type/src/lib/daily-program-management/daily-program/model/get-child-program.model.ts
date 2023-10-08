import { Expose } from 'class-transformer';

import { GetManyActivityModel } from './get-many-activity.model';

export class GetChildProgramModel {
	@Expose()
	id!: number;

	@Expose()
	name!: string;

	@Expose()
	activities!: GetManyActivityModel[];

	@Expose()
	createdAt!: Date;

	@Expose()
	updatedAt!: Date;
}
