import { Expose, Type } from 'class-transformer';

import { ExternalCenterTaskModel } from './external-center-task.model';
import { InternalCenterTaskModel } from './internal-center-task.model';

export class CenterTaskTypeModel {
	@Expose()
	@Type(() => ExternalCenterTaskModel)
	externalCenterTask?: ExternalCenterTaskModel | null;

	@Expose()
	@Type(() => InternalCenterTaskModel)
	internalCenterTask?: InternalCenterTaskModel | null;
}
