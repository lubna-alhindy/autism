import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateMatchingExerciseDto {
	@ApiProperty({ required: true })
	@IsNumber()
	mainContentId!: number;

	@ApiProperty({ required: true })
	@IsNumber()
	content1Id!: number;

	@ApiProperty({ required: true })
	@IsNumber()
	content2Id!: number;

	@ApiProperty({ required: true })
	@IsNumber()
	content3Id!: number;
}
