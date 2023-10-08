import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Content, Sound, Word, Image, RolePermission } from '@autism/shared/type';

import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([RolePermission, Content, Image, Sound, Word]),
		NestjsFormDataModule.config({
			storage: MemoryStoredFile
		})
	],
	controllers: [ContentController],
	providers: [ContentService],
	exports: [ContentService]
})
export class ContentModule {}
