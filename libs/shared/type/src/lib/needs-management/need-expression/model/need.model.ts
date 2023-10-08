import { Expose } from 'class-transformer';

import { GetOneContentModel } from '../../../content-management';
import { Need } from '../entities';

export class NeedModel {
	@Expose()
	id!: number;

	@Expose()
	level!: number;

	parent?: Need;

	@Expose()
	content?: GetOneContentModel;

	@Expose()
	sound?: GetOneContentModel;

	@Expose()
	createdAt!: Date;

	@Expose()
	updatedAt!: Date;

	@Expose()
	deletedAt!: Date;
}
