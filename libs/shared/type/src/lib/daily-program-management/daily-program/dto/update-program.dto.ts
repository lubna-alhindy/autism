import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ActivityId } from './activity-id.dto';

export class UpdateProgramDto {
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false})
	name!: string;

	@ApiProperty({ type: [ActivityId], required: true })
	@ValidateNested({ each: true })
	@Type(() => ActivityId)
	@IsOptional()
	activities!: ActivityId[];
}
