import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPlanProgressiveReportDto {
	@Type(() => Number)
	@IsOptional()
	@ApiProperty({ required: false })
	domainId!: number;
}
