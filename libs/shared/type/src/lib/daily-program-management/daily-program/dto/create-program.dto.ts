import { IsString, ValidateNested, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ActivityId } from './activity-id.dto';

export class CreateProgramDto {
	@IsString()
	@ApiProperty({required:true})
	name!: string;

	@ApiProperty({ type: [ActivityId] ,required: true})
	@ValidateNested({ each: true })
	@Type(() => ActivityId)
	activities!: ActivityId[];
}
