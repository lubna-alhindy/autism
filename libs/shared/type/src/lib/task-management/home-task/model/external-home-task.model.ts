import { Expose } from 'class-transformer';

export class ExternalHomeTaskModel {
	@Expose()
	id!: number;

	@Expose()
	createdAt!: Date;
}
