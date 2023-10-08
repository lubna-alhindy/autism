import { Expose } from 'class-transformer';

import { StatementCompositionModel } from './statement-composition.model';
import { NumberCompareModel } from './number-compare.model';
import { NumberOrderModel } from './number-order.model';
import { MatchingModel } from './matching.model';
import { TimeModel } from './time.model';

export class ExerciseModel {
	@Expose()
	statementComposition?: StatementCompositionModel | null;

	@Expose()
	numberCompare?: NumberCompareModel | null;

	@Expose()
	numberOrder?: NumberOrderModel | null;

	@Expose()
	matching?: MatchingModel | null;

	@Expose()
	time?: TimeModel | null;
}
