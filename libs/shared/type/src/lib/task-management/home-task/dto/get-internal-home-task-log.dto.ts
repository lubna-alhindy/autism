import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetInternalHomeTaskLogDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Number)
	page!: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Number)
	limit!: number;

	@ApiProperty({
		enum: ['true', 'false'],
		required: false
	})
	@IsOptional()
	@IsEnum(['true', 'false'], {
		message: `status must be one of the following values ['true', 'false']`
	})
	status?: 'true' | 'false';
}
