import { IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { CreateGoalDto } from './create-goal.dto';

export class UpdatePlanDto {
	@ApiProperty({ type: CreateGoalDto, isArray: true })
	@Type(() => CreateGoalDto)
	@ValidateNested({ each: true })
	@IsArray()
	goals!: CreateGoalDto[];
}
