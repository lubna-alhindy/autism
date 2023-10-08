import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GeneratePep3TestPlanDto {
	@ApiProperty({ required: true })
	@IsNumber()
	childId!: number;

	@ApiProperty({ required: true })
	@IsNumber()
	pep3TestId!: number;
}
