import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Child, ChildNeedLevel, ChildNeedLog, Content, Need, Word, Image, Sound, RolePermission } from '@autism/shared/type';

import { NeedsController } from './needs.controller';
import { NeedsService } from './needs.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([RolePermission, Need, ChildNeedLevel, ChildNeedLog, Content, Child, Word, Image, Sound])
	],
	controllers: [NeedsController],
	providers: [NeedsService],
	exports: [NeedsService]
})
export class NeedsModule {}
