import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
	Word,
	Image,
	Child,
	Program,
	Activity,
	ProgramChild,
	RolePermission,
	ActivityProgram
} from '@autism/shared/type';

import { DailyProgrammeController } from './daily-programme.controller';
import { DailyProgrammeService } from './daily-programme.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Word, Image, Child, Program, Activity, ProgramChild, RolePermission, ActivityProgram])
	],
	controllers: [DailyProgrammeController],
	providers: [DailyProgrammeService],
	exports: [DailyProgrammeService]
})
export class DailyProgrammeModule {}
