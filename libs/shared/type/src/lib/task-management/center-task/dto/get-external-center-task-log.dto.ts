import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

import { ISO8601DateRegEx } from '@autism/shared/regex';

export class GetExternalCenterTaskLogDto {
	@ApiProperty({ required: true })
	@Matches(ISO8601DateRegEx)
	date!: string;
}
