import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { splitEnum } from '@autism/shared/util';

import { ExerciseType } from '../../exercise';

export class GetCenterTaskForChildDto {
	@ApiProperty({
		enum: splitEnum(ExerciseType),
		required: true
	})
	@IsEnum(splitEnum(ExerciseType), {
		message: `exercise-type must be one of the following values ${splitEnum(ExerciseType)}`
	})
	exerciseType!: string;
}
