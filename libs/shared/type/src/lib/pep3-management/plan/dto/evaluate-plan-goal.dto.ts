import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { splitEnum } from '@autism/shared/util';

import { Evaluation } from '../../../pep3-management/pep3-test/enum';

export class EvaluatePlanGoalDto {
	@ApiProperty({
		enum: splitEnum(Evaluation),
		required: true
	})
	@IsEnum(splitEnum(Evaluation), {
		message: `evaluation must be one of the following values [${splitEnum(Evaluation)}]`
	})
	evaluation!: string;

	@ApiProperty({
		required: false
	})
	@IsOptional()
	@IsString()
	note!: string;

	@ApiProperty({
		required: false
	})
	@IsOptional()
	@IsString()
	motivation!: string;
}
