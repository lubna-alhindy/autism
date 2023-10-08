import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoalDto {
	@ApiProperty({ required: true })
	@IsNumber()
	pep3QuestionId!: number;
}
