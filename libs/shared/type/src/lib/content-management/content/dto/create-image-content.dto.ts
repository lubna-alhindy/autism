import { IsFile, MaxFileSize, HasMimeType, MemoryStoredFile } from 'nestjs-form-data';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageContentDto {
	@IsFile()
	@MaxFileSize(1024 * 1024 * 10)
	@HasMimeType(['image/png', 'image/jpg', 'image/jpeg'])
	@ApiProperty({ required: true })
	image!: MemoryStoredFile;
}
