import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNeedDto {
	@IsNumber()
	@ApiProperty({ required: true })
	contentId!: number;

	@IsNumber()
	@IsOptional()
	@ApiProperty({ required: false })
	soundId!: number;

	@IsNumber()
	@ApiProperty({ required: true })
	parentId!: number;
}
