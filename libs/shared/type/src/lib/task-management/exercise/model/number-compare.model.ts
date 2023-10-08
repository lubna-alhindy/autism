import { Expose } from 'class-transformer';

export class NumberCompareModel {
	@Expose()
	id!: number;

	@Expose()
	number1!: number;

	@Expose()
	number2!: number;

	@Expose()
	answer!: string;

	@Expose()
	createdAt!: Date;
}
