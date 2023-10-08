import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCenterTaskDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	taskName!: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	sessionNumber!: number;
}
