import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateWordContentDto {
	@IsString()
	@MaxLength(16)
	@ApiProperty({ required: true })
	word!: string;
}
