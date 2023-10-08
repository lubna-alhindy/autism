import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFamilyPasswordDto {
	@IsString()
	@Length(8, 32)
	@ApiProperty()
	oldFamilyPassword!: string;

	@IsString()
	@Length(8, 32)
	@ApiProperty()
	newFamilyPassword!: string;
}
