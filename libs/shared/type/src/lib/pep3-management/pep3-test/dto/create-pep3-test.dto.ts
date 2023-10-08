import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePep3TestDto {
	@IsString()
	@IsOptional()
	@ApiProperty({required:false})
	bodyDescription!: string;

	@IsString()
	@IsOptional()
	@ApiProperty({required:false})
	behaviorDescription!: string;

	@ApiProperty({required:true})
	@IsInt()
	childId!: number;
}
