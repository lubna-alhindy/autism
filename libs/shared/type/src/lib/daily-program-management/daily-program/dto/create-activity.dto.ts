import { IsNumber, IsString, Matches, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { timeRegEx } from '@autism/shared/regex';

export class CreateActivityDto {
	@IsString()
	@ApiProperty({ required: true })
	name!: string;

	@IsNumber()
	@Min(10)
	@ApiProperty({ required: true })
	duration!: number;

	@Matches(timeRegEx)
	@ApiProperty({ required: true })
	time!: string;

	@IsNumber()
	@ApiProperty({ required: true })
	contentId!: number;
}
