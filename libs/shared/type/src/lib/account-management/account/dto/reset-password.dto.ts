import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
	@IsString()
	@Length(8, 32)
	@ApiProperty()
	newPassword!: string;
}
