import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetClassTeachersDto {
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
	
	@IsEnum(['true', 'false'])
	@IsOptional()
	@ApiProperty({
		enum: ['true', 'false'],
		required: false
	})
	isBlocked!: 'true' | 'false';
}
