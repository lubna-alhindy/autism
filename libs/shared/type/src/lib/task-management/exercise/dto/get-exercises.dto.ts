import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ExerciseType } from '../enums';

export class GetExercisesDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Number)
	page!: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Number)
	limit!: number;

	@IsEnum(splitEnum(ExerciseType), {
		message: `ExerciseType must be one of the following values [${splitEnum(ExerciseType)}]`
	})
	@IsOptional()
	@ApiProperty({
		enum: splitEnum(ExerciseType)
	})
	type!: string;
}
