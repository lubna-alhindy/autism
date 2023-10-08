import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
	@IsString()
	@Length(8, 32)
	@ApiProperty()
	oldPassword!: string;

	@IsString()
	@Length(8, 32)
	@ApiProperty()
	newPassword!: string;
}
