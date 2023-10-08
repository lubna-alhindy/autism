import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { splitEnum } from '@autism/shared/util';

import { ClassLevel } from '../enum';

export class UpdateClassDto {
	@IsString()
	@ApiProperty({ required: false })
	@IsOptional()
	name!: string;

	@IsEnum(splitEnum(ClassLevel), {
		message: `level must be one of the following values [${splitEnum(ClassLevel)}]`
	})
	@ApiProperty({
		required: false,
		enum: splitEnum(ClassLevel)
	})
	@IsOptional()
	level!: string;
}
