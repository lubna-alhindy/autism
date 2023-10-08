import { Controller, Get, Param, Query, Delete, Post, Put, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Child,
	Class,
	Teacher,
	Account,
	Specialist,
	CreateClassDto,
	UpdateClassDto,
	PaginationModel,
	GetManyClassDto,
	GetClassChildsDto,
	GetChildTeachersDto,
	GetClassTeachersDto,
	GetTeacherClassesDto,
	GetChildSpecialistsDto,
	GetClassSpecialistsDto,
	GetSpecialistClassesDto,
	GetChildUnassignedToClassDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { ClassService } from './class.service';

@ApiTags('class-management')
@Controller('class')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class ClassController {
	constructor(private classService: ClassService) {}

	@Post()
	@Serialize<Class>(Class)
	createClass(@Body() body: CreateClassDto, @IdentifyAccount() account: Account) {
		return this.classService.createClass(body, account);
	}

	@Put(':classId')
	@Serialize<Class>(Class)
	updateClass(@Param('classId') classId: string, @Body() body: UpdateClassDto) {
		return this.classService.updateClass(body, +classId);
	}

	@Delete(':classId')
	deleteClass(@Param('classId') classId: string) {
		return this.classService.deleteClass(+classId);
	}

	@Post('assign-child-to-class/:accountId/:classId')
	addChildToClass(
		@Param('accountId') accountId: string,
		@Param('classId') classId: string,
		@IdentifyAccount() account: Account
	) {
		return this.classService.addChildToClass(+accountId, +classId, account);
	}

	@Delete('unassign-child-from-class/:accountId/:classId')
	removeChildFromClass(@Param('accountId') accountId: string, @Param('classId') classId: string) {
		return this.classService.removeChildFromClass(+accountId, +classId);
	}

	@Post('assign-teacher-to-class/:accountId/:classId')
	assignTeacherToClass(
		@Param('accountId') accountId: string,
		@Param('classId') classId: string,
		@IdentifyAccount() account: Account
	) {
		return this.classService.assignTeacherToClass(+accountId, +classId, account);
	}

	@Delete('unassign-teacher-from-class/:accountId/:classId')
	unassignTeacherFromClass(@Param('accountId') accountId: string, @Param('classId') classId: string) {
		return this.classService.unassignTeacherFromClass(+accountId, +classId);
	}

	@Post('assign-specialist-to-class/:accountId/:classId')
	assignSpecialistToClass(
		@Param('accountId') accountId: string,
		@Param('classId') classId: string,
		@IdentifyAccount() account: Account
	) {
		return this.classService.assignSpecialistToClass(+accountId, +classId, account);
	}

	@Delete('unassign-specialist-from-class/:accountId/:classId')
	unassignSpecialistFromClass(@Param('accountId') accountId: string, @Param('classId') classId: string) {
		return this.classService.unassignSpecialistFromClass(+accountId, +classId);
	}

	@Get()
	@Serialize<PaginationModel<Class>>(PaginationModel<Class>)
	getManyClass(@Query() query: GetManyClassDto) {
		return this.classService.getManyClass(query);
	}

	@Get('child-unassign-to-class')
	@Serialize<PaginationModel<Child>>(PaginationModel<Child>)
	getChildUnassignedToClass(@Query() query: GetChildUnassignedToClassDto) {
		return this.classService.getChildUnassignedToClass(query);
	}

	@Get(':classId')
	@Serialize<Class>(Class)
	getOneClass(@Param('classId') classId: string) {
		return this.classService.getOneClass(+classId);
	}

	@Get('child-teachers/:accountId')
	@Serialize<PaginationModel<Teacher>>(PaginationModel<Teacher>)
	getChildTeachers(@Query() query: GetChildTeachersDto, @Param('accountId') accountId: string) {
		return this.classService.getChildTeachers(query, +accountId);
	}

	@Get('child-specialists/:accountId')
	@Serialize<PaginationModel<Specialist>>(PaginationModel<Specialist>)
	getChildSpecialists(@Query() query: GetChildSpecialistsDto, @Param('accountId') accountId: string) {
		return this.classService.getChildSpecialists(query, +accountId);
	}

	@Get('class-teachers/:classId')
	@Serialize<PaginationModel<Teacher>>(PaginationModel<Teacher>)
	getClassTeachers(@Query() query: GetClassTeachersDto, @Param('classId') classId: string) {
		return this.classService.getClassTeachers(query, +classId);
	}

	@Get('class-specialists/:classId')
	@Serialize<PaginationModel<Specialist>>(PaginationModel<Specialist>)
	getClassSpecialists(@Query() query: GetClassSpecialistsDto, @Param('classId') classId: string) {
		return this.classService.getClassSpecialists(query, +classId);
	}

	@Get('class-childs/:classId')
	@Serialize<PaginationModel<Child>>(PaginationModel<Child>)
	getClassChilds(@Query() query: GetClassChildsDto, @Param('classId') classId: string) {
		return this.classService.getClassChilds(query, +classId);
	}

	@Get('teacher-classes/:accountId')
	@Serialize<PaginationModel<Class>>(PaginationModel<Class>)
	getClassesOfTeacher(@Query() query: GetTeacherClassesDto, @Param('accountId') accountId: string) {
		return this.classService.getClassesOfTeacher(query, +accountId);
	}

	@Get('specialist-classes/:accountId')
	@Serialize<PaginationModel<Class>>(PaginationModel<Class>)
	getClassesOfSpecialist(@Query() query: GetSpecialistClassesDto, @Param('accountId') accountId: string) {
		return this.classService.getClassesOfSpecialist(query, +accountId);
	}
}
