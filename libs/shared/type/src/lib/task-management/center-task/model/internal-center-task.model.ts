import { Expose } from 'class-transformer';

export class InternalCenterTaskModel {
	@Expose()
	id!: number;

	@Expose()
	exerciseId!: number;

	@Expose()
	createdAt!: Date;
}
