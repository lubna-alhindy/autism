import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { splitEnum } from '@autism/shared/util';

import { CenterTaskType } from '../enums';

export class CreateCenterTaskDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	exerciseId?: number;

	@ApiProperty({
		enum: splitEnum(CenterTaskType),
		required: true
	})
	@IsEnum(splitEnum(CenterTaskType), {
		message: `center-task-type must be one of the following values ${splitEnum(CenterTaskType)}`
	})
	taskType!: string;

	@ApiProperty({ required: true })
	@IsNumber()
	sessionNumber!: number;

	@ApiProperty({ required: true })
	@IsString()
	taskName!: string;

	@ApiProperty({ required: true })
	@IsNumber()
	classId!: number;
}
