import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
	Child,
	Class,
	Teacher,
	HomeTask,
	ClassChild,
	ClassTeacher,
	ChildHomeTask,
	RolePermission,
	ExternalHomeTask,
	InternalHomeTask,
	ExternalHomeTaskLog,
	InternalHomeTaskLog
} from '@autism/shared/type';

import { HomeTaskController } from './home-task.controller';
import { HomeTaskService } from './home-task.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Class,
			Child,
			Teacher,
			HomeTask,
			ClassChild,
			ClassTeacher,
			ChildHomeTask,
			RolePermission,
			ExternalHomeTask,
			InternalHomeTask,
			InternalHomeTaskLog,
			ExternalHomeTaskLog
		])
	],
	controllers: [HomeTaskController],
	providers: [HomeTaskService],
	exports: [HomeTaskService]
})
export class HomeTaskModule {}
