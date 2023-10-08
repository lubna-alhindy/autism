import { Expose } from 'class-transformer';

export class StatementCompositionModel {
	@Expose()
	id!: number;

	@Expose()
	statement!: string[];

	@Expose()
	answer!: string[];

	@Expose()
	createdAt!: Date;
}
