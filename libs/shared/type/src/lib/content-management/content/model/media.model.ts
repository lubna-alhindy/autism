import { Expose } from 'class-transformer';

export class Media {
	@Expose()
	id!: number;

	@Expose()
	url?: string | null;

	@Expose()
	word?: string | null;
}
