import { NestjsFormDataModule, MemoryStoredFile } from 'nestjs-form-data';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Profile, Child, RolePermission } from '@autism/shared/type';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([RolePermission, Profile, Child]),
		NestjsFormDataModule.config({
			storage: MemoryStoredFile
		})
	],
	controllers: [ProfileController],
	providers: [ProfileService],
	exports: [ProfileService]
})
export class ProfileModule {}
