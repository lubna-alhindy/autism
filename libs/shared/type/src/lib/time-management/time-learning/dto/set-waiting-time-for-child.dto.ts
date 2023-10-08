import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class SetWaitingTimeForChildDto {
	@ApiProperty({ required: true })
	@IsInt()
	time!: number;
}
