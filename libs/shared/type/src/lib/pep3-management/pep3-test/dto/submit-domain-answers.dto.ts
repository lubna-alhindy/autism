import { IsInt, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { Pep3AnswerDto } from './pep3-answer.dto';

export class SubmitDomainAnswersDto {
	@IsInt()
	@ApiProperty({ required: true })
	currentDomainId!: number;

	@ApiProperty({ type: [Pep3AnswerDto] })
	@ValidateNested({ each: true })
	@Type(() => Pep3AnswerDto)
	pep3Answers!: Pep3AnswerDto[];
}
