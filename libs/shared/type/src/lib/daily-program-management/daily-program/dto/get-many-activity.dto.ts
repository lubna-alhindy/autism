import { IsOptional, IsString, Matches, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { timeRegEx } from '@autism/shared/regex';

export class GetManyActivityDto {
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	word!: string;

	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	page!: number;

	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	limit!: number;

	@IsOptional()
	@ApiProperty({ required: false })
	@Matches(timeRegEx)
	time!: string;

	@IsOptional()
	@Type(() => Number)
	@Min(10)
	@ApiProperty({ required: false })
	duration!: number;
}
