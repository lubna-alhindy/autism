import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateStatementCompositionExerciseDto {
	@ApiProperty({ required: true })
	@IsString()
	statement!: string;
}
