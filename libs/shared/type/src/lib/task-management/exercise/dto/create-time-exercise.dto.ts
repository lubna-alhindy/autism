import { IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { timeRegEx } from '@autism/shared/regex';
import { splitEnum } from '@autism/shared/util';

import { TimeExerciseType } from '../enums';

export class CreateTimeExerciseDto {
	@ApiProperty({ required: true })
	@Matches(timeRegEx, {
		message: 'mainTime should be of the form HH:MM'
	})
	mainTime!: string;

	@ApiProperty({ required: true })
	@Matches(timeRegEx, {
		message: 'mainTime should be of the form HH:MM'
	})
	time2!: string;

	@ApiProperty({ required: true })
	@Matches(timeRegEx, {
		message: 'mainTime should be of the form HH:MM'
	})
	time3!: string;

	@IsEnum(splitEnum(TimeExerciseType), {
		message: `type must be one of the following values [${splitEnum(TimeExerciseType)}]`
	})
	@ApiProperty({
		enum: splitEnum(TimeExerciseType)
	})
	type!: string;
}
