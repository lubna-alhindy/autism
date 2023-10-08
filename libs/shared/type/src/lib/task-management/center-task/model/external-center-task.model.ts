import { Expose } from 'class-transformer';

export class ExternalCenterTaskModel {
	@Expose()
	id!: number;

	@Expose()
	createdAt!: Date;
}
