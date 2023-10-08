import { IsEnum, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ContentType } from '../../../content-management';

export class GetManyNeedDto {
	@IsEnum(splitEnum(ContentType), {
		message: `type must be one of the following values [${splitEnum(ContentType)}]`
	})
	@IsOptional()
	@ApiProperty({
		enum: splitEnum(ContentType),
		required: false
	})
	type?: string;

	@Type(() => Number)
	@IsOptional()
	@Min(1)
	@Max(3)
	@ApiProperty({
		required: true,
		minimum: 1,
		maximum: 3
	})
	childLevel!: number;
}
