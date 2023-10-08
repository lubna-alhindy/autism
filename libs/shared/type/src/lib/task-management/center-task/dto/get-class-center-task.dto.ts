import { Matches, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ISO8601DateRegEx } from '@autism/shared/regex';
import { splitEnum } from '@autism/shared/util';

import { CenterTaskType } from '../enums';

export class GetClassCenterTaskDto {
	@ApiProperty({ required: true })
	@Matches(ISO8601DateRegEx)
	date!: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Number)
	page!: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Number)
	limit!: number;

	@ApiProperty({
		enum: splitEnum(CenterTaskType),
		required: false
	})
	@IsOptional()
	@IsEnum(splitEnum(CenterTaskType), {
		message: `center-task-type must be one of the following values ${splitEnum(CenterTaskType)}`
	})
	taskType!: string;
}
