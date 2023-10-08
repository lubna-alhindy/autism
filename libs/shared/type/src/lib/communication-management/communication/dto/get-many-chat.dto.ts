import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetManyChatDto {
	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	page!: number;

	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	limit!: number;
}
