import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
	Class,
	Child,
	Teacher,
	Account,
	Specialist,
	ClassChild,
	ClassTeacher,
	RolePermission,
	ClassSpecialist
} from '@autism/shared/type';

import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Class,
			Child,
			Teacher,
			Account,
			Specialist,
			ClassChild,
			ClassTeacher,
			RolePermission,
			ClassSpecialist,
		])
	],
	controllers: [ClassController],
	providers: [ClassService],
	exports: [ClassService]
})
export class ClassModule {}
