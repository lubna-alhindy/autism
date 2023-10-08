import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto {
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	name!: string;

	@IsNumber()
	@ApiProperty({ required: false })
	contentId!: number;
}
