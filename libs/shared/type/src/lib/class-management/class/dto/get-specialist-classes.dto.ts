import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ClassLevel } from '../enum';

export class GetSpecialistClassesDto {
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	word!: string;

	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	page!: number;

	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	limit!: number;

	@IsEnum(splitEnum(ClassLevel), {
		message: `level must be one of the following values [${splitEnum(ClassLevel)}]`
	})
	@IsOptional()
	@ApiProperty({
		enum: splitEnum(ClassLevel)
	})
	level!: string;
}
