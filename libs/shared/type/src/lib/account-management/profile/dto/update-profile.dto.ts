import { IsString, Length, IsOptional, Validate } from 'class-validator';
import { MemoryStoredFile } from 'nestjs-form-data';
import { ApiProperty } from '@nestjs/swagger';

import { MiddleNameValidator, HomeAddressValidator, BirthDayValidator, PhoneNumberValidator } from '../validators';

export class UpdateProfileDto {
	@IsString()
	@Length(1, 64)
	@IsOptional()
	@ApiProperty({ required: false })
	firstName!: string;

	@IsString()
	@Length(1, 64)
	@IsOptional()
	@ApiProperty({ required: false })
	lastName!: string;

	@IsOptional()
	@Validate(MiddleNameValidator)
	@ApiProperty({ required: false, nullable: true })
	middleName!: string | null;

	@IsOptional()
	@Validate(HomeAddressValidator)
	@ApiProperty({ required: false, nullable: false })
	homeAddress!: string | null;

	@IsOptional()
	@Validate(BirthDayValidator)
	@ApiProperty({ required: false, nullable: true })
	birthday!: string | null;

	@IsOptional()
	@Validate(PhoneNumberValidator)
	@ApiProperty({ required: false, nullable: true })
	phoneNumber?: string | null;

	@IsOptional()
	@ApiProperty({ required: false, nullable: true })
	image?: MemoryStoredFile | null;
}
