import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { AccountType } from '../enums';

export class GetManyAccountDto {
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	word!: string;

	@IsEnum(['true', 'false'])
	@IsOptional()
	@ApiProperty({
		enum: ['true', 'false'],
		required: false
	})
	isBlocked!: 'true' | 'false';

	@IsEnum(splitEnum(AccountType), {
		message: `accountType must be one of the following values [${splitEnum(AccountType)}]`
	})
	@IsOptional()
	@ApiProperty({
		required: false,
		enum: splitEnum(AccountType)
	})
	accountType!: string;

	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	page!: number;

	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	limit!: number;
}
