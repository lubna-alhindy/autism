import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class ActivityId {
	@ApiProperty({required: true})
	@IsInt()
	id!: number;
}
