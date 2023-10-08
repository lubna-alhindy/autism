import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
	Child,
	Class,
	Teacher,
	ClassChild,
	CenterTask,
	ClassTeacher,
	RolePermission,
	ChildCenterTask,
	ExternalCenterTask,
	InternalCenterTask,
	ExternalCenterTaskLog,
	InternalCenterTaskLog
} from '@autism/shared/type';

import { CenterTaskController } from './center-task.controller';
import { CenterTaskService } from './center-task.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Class,
			Child,
			Teacher,
			CenterTask,
			ClassChild,
			ClassTeacher,
			RolePermission,
			ChildCenterTask,
			ExternalCenterTask,
			InternalCenterTask,
			InternalCenterTaskLog,
			ExternalCenterTaskLog
		])
	],
	controllers: [CenterTaskController],
	providers: [CenterTaskService],
	exports: [CenterTaskService]
})
export class CenterTaskModule {}
