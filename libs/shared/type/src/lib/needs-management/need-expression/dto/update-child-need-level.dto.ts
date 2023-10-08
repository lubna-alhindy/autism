import { IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateChildNeedLevelDto {
	@IsInt()
	@Min(1)
	@Max(3)
	@ApiProperty({
		required: true,
		minimum: 1,
		maximum: 3
	})
	needLevel!: number;
}
