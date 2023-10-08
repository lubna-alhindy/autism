import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@IsString()
	@IsEmail()
	@ApiProperty()
	email!: string;

	@IsString()
	@Length(8, 32,{
		message:'يجب أن يكون طول كلمة السر بين 8 و32 محرف'
	})
	@ApiProperty()
	password!: string;
}
