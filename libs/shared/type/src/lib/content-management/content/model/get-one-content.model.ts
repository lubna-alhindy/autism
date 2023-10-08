import { Expose, Type } from 'class-transformer';

import { Media } from './media.model';

export class GetOneContentModel {
	@Expose()
	id!: number;

	@Expose()
	@Type(() => Media)
	media!: Media;

	@Expose()
	contentType!: string;

	@Expose()
	createdAt!: Date;
}
