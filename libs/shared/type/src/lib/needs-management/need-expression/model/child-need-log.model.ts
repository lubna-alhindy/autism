import { Expose } from 'class-transformer';

import { NeedModel } from './need.model';

export class ChildNeedLogModel {
	@Expose()
	id!: number;

	@Expose()
	status!: boolean;

	@Expose()
	needs?: NeedModel[];

	@Expose()
	createdAt!: Date;
}
