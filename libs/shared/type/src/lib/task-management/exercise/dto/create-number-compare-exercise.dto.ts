import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateNumberCompareExerciseDto {
	@ApiProperty({ required: true })
	@IsNumber()
	number1!: number;

	@ApiProperty({ required: true })
	@IsNumber()
	number2!: number;
}
