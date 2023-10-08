import { IsFile, MaxFileSize, MemoryStoredFile, HasExtension } from 'nestjs-form-data';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSoundContentDto {
	@IsFile()
	@MaxFileSize(1024 * 1024 * 10)
	@HasExtension(['mp3', 'mp4', 'wav', 'm4a', 'wave'])
	@ApiProperty({ required: true })
	sound!: MemoryStoredFile;
}
