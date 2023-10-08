import { Expose } from 'class-transformer';

export class InternalHomeTaskModel {
	@Expose()
	id!: number;

	@Expose()
	exerciseId!: number;

	@Expose()
	createdAt!: Date;
}
