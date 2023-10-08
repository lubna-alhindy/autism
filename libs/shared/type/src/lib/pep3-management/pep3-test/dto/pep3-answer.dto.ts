import { IsEnum, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { splitEnum } from '@autism/shared/util';

import { Evaluation } from '../enum';

export class Pep3AnswerDto {
	@IsEnum(splitEnum(Evaluation), {
		message: `evaluation must be one of the following values [${splitEnum(Evaluation)}]`
	})
	@ApiProperty({
		enum: splitEnum(Evaluation),
		required: true
	})
	evaluation!: string;

	@IsInt()
	@ApiProperty({
		required: true
	})
	questionId!: number;
}
