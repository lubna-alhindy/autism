import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@MaxLength(30)
	@IsString()
	subject!: string;

	@ApiProperty({ required: true })
	@IsString()
	content!: string;
}
