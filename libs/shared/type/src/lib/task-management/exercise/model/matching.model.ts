import { Expose } from 'class-transformer';

export class MatchingModel {
	@Expose()
	id!: number;

	@Expose()
	mainContentId!: number;
	
	@Expose()
	content1Id!: number;
	
	@Expose()
	content2Id!: number;
	
	@Expose()
	content3Id!: number;
	
	@Expose()
	answer!: number;
	
	@Expose()
	createdAt!: Date;
}
