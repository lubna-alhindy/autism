import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { splitEnum } from '@autism/shared/util';

import { ChildHomeTaskPerformance } from '../enums';

export class CreateExternalHomeTaskLogDto {
	@ApiProperty({ required: true })
	@IsInt()
	homeTaskId!: number;

	@ApiProperty({
		enum: splitEnum(ChildHomeTaskPerformance),
		required: true
	})
	@IsEnum(splitEnum(ChildHomeTaskPerformance), {
		message: `performance must be one of the following values [${splitEnum(ChildHomeTaskPerformance)}]`
	})
	childPerformance!: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	note!: string;
}
