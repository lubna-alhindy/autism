import { Expose, Type } from 'class-transformer';

import { Pep3Test } from '../entities';

export class CreatePep3TestModel {
	@Expose()
	@Type(() => Pep3Test)
	pep3Test!: Pep3Test;

	@Expose()
	currentDomainId!: number;
}
