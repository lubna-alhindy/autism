import { Expose, Type } from 'class-transformer';

import { ExternalHomeTaskModel } from './external-home-task.model';
import { InternalHomeTaskModel } from './internal-home-task.model';

export class HomeTaskTypeModel {
	@Expose()
	@Type(() => ExternalHomeTaskModel)
	externalHomeTask?: ExternalHomeTaskModel | null;

	@Expose()
	@Type(() => InternalHomeTaskModel)
	internalHomeTask?: InternalHomeTaskModel | null;
}
