import { Expose } from 'class-transformer';

import { GetOneContentModel } from '../../../content-management';

export class GetManyActivityModel {
	@Expose()
	id!: number;

	@Expose()
	name!: string;

	@Expose()
	duration!: number;

	@Expose()
	time!: string;

	@Expose()
	content?: GetOneContentModel;

	@Expose()
	createdAt!: Date;
}
