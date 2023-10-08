import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateNumberOrderExerciseDto {
	@ApiProperty({ required: true })
	@IsInt({ each: true })
	numbers!: number[];
}
