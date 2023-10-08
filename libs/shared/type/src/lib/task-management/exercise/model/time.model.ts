import { Expose } from 'class-transformer';

export class TimeModel {
	@Expose()
	id!: number;

	@Expose()
	mainTime!: string;

	@Expose()
	time1!: string;

	@Expose()
	time2!: string;

	@Expose()
	time3!: string;

	@Expose()
	answer!: number;

	@Expose()
	type!: string;

	@Expose()
	createdAt!: Date;
}
