import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { splitEnum } from '@autism/shared/util';

import { ClassLevel } from '../enum';

export class CreateClassDto {
	@IsString()
	@ApiProperty()
	name!: string;

	@IsEnum(splitEnum(ClassLevel), {
		message: `level must be one of the following values [${splitEnum(ClassLevel)}]`
	})
	@ApiProperty({
		enum: splitEnum(ClassLevel)
	})
	level!: string;
}
