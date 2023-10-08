import {
	Length,
	IsEnum,
	IsEmail,
	Matches,
	IsString,
	MinLength,
	MaxLength,
	IsOptional,
	IsDateString,
	IsNumberString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { usernameRegEx } from '@autism/shared/regex';
import { splitEnum } from '@autism/shared/util';

import { AccountType } from '../enums/account-type.enum';

export class RegisterDto {
	@IsEmail()
	@IsString()
	@ApiProperty()
	email!: string;

	@IsString()
	@ApiProperty()
	@Length(8, 32, {
		message: 'يجب أن يكون طول كلمة السر بين 8 و32 محرف'
	})
	password!: string;

	@Matches(usernameRegEx)
	@ApiProperty()
	@Length(1, 64)
	userName!: string;

	@IsString()
	@ApiProperty()
	@Length(1, 64)
	firstName!: string;

	@IsString()
	@ApiProperty()
	@Length(1, 64)
	lastName!: string;

	@IsString()
	@Length(1, 64)
	@IsOptional()
	@ApiProperty({ required: false })
	middleName!: string;

	@IsString()
	@Length(1, 255)
	@ApiProperty({ required: true })
	nationality!: string;

	@IsString()
	@Length(1, 255)
	@ApiProperty({ required: true })
	homeAddress!: string;

	@IsDateString()
	@IsOptional()
	@ApiProperty({ required: false })
	birthday!: Date;

	@IsNumberString()
	@MinLength(10)
	@MaxLength(10)
	@IsOptional()
	@ApiProperty({ required: false })
	phoneNumber!: string;

	@IsString()
	@Length(8, 32)
	@IsOptional()
	@ApiProperty({ required: false })
	familyPassword!: string;

	@IsString()
	@Length(1, 255)
	@IsOptional()
	@ApiProperty({ required: false })
	motherName!: string;

	@IsString()
	@Length(1, 255)
	@IsOptional()
	@ApiProperty({ required: false })
	guardianName!: string;

	@IsEnum(splitEnum(AccountType), {
		message: `accountType must be one of the following values [${splitEnum(AccountType)}]`
	})
	@ApiProperty({
		enum: splitEnum(AccountType)
	})
	accountType!: string;
}
