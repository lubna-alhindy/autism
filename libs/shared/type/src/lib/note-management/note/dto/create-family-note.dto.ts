import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFamilyNoteDto {
	@IsString()
	@ApiProperty({ required: true })
	note!: string;

	@IsInt()
	@ApiProperty({ required: true })
	childAccountId!: number;
}
