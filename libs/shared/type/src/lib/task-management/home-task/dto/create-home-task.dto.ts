import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { splitEnum } from '@autism/shared/util';

import { HomeTaskType } from '../enums';

export class CreateHomeTaskDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@IsNumber()
	exerciseId?: number;

	@ApiProperty({
		enum: splitEnum(HomeTaskType),
		required: true
	})
	@IsEnum(splitEnum(HomeTaskType), {
		message: `home-task-type must be one of the following values ${splitEnum(HomeTaskType)}`
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
