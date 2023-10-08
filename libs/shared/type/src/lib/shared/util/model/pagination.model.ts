import { Expose } from 'class-transformer';

export class PaginationModel<T> {
	@Expose()
	count!: number;

	@Expose()
	total!: number;

	@Expose()
	page!: number;

	@Expose()
	pageCount!: number;

	@Expose()
	data!: T[];
}
