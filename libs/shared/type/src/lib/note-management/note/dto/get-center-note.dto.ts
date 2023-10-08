import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetCenterNoteDto {
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
}
