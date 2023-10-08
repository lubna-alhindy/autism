import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInternalHomeTaskLogDto {
	@ApiProperty({ required: true })
	@IsInt()
	homeTaskId!: number;

	@ApiProperty({
		enum: ['true', 'false'],
		required: false
	})
	@IsOptional()
	@IsEnum(['true', 'false'], {
		message: `status must be one of the following values ['true', 'false']`
	})
	status!: 'true' | 'false';

	@ApiProperty({ required: true })
	@IsInt()
	numOfTry!: number;

	@ApiProperty({ required: true })
	@IsInt()
	time!: number;
}
