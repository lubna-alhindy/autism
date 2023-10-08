import { IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';
import { HomeTaskType } from '../enums';


export class GetManyHomeTaskDto {
	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Number)
	page!: number;

	@ApiProperty({ required: false })
	@IsOptional()
	@Type(() => Number)
	limit!: number;

	@ApiProperty({
		enum: splitEnum(HomeTaskType),
		required: false
	})
	@IsOptional()
	@IsEnum(splitEnum(HomeTaskType), {
		message: `home-task-type must be one of the following values ${splitEnum(HomeTaskType)}`
	})
	taskType!: string;
}
