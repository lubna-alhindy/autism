import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { splitEnum } from '@autism/shared/util';

import { ChildCenterTaskPerformance } from '../enums';

export class CreateExternalCenterTaskLogDto {
	@ApiProperty({ required: true })
	@IsInt()
	centerTaskId!: number;

	@ApiProperty({
		enum: splitEnum(ChildCenterTaskPerformance),
		required: true
	})
	@IsEnum(splitEnum(ChildCenterTaskPerformance), {
		message: `performance must be one of the following values [${splitEnum(ChildCenterTaskPerformance)}]`
	})
	childPerformance!: string;

	@ApiProperty({ required: false })
	@IsOptional()
	@IsString()
	note!: string;
}
