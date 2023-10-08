import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddSoundToNeedDto {
	@IsNumber()
	@ApiProperty({ required: true })
	soundId!: number;
}
