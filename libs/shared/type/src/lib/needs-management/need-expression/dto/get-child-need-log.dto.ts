import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetChildNeedLogDto {
	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	page!: number;

	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	limit!: number;

	@IsEnum(['true', 'false'], {
		message: `status must be one of the following values ['true', 'false']`
	})
	@IsOptional()
	@ApiProperty({
		enum: ['true', 'false'],
		required: false
	})
	status!: 'true' | 'false';
}
