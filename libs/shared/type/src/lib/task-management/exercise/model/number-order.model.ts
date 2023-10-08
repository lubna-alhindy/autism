import { Expose } from 'class-transformer';

export class NumberOrderModel {
	@Expose()
	id!: number;

	@Expose()
	numbers!: number[];

	@Expose()
	answer!: number[];

	@Expose()
	createdAt!: Date;
}
