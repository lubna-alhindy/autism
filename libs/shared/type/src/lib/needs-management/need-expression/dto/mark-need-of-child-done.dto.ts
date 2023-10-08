import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class MarkNeedOfChildDoneDto {
	@IsNumber()
	@ApiProperty()
	id!: number;
}
