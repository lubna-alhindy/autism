import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Account,
	CenterTaskModel,
	PaginationModel,
	UpdateCenterTaskDto,
	CreateCenterTaskDto,
	GetManyCenterTaskDto,
	GetClassCenterTaskDto,
	GetCenterTaskForChildDto,
	InternalCenterTaskLogModel,
	GetInternalCenterTaskLogDto,
	GetExternalCenterTaskLogDto,
	CreateExternalCenterTaskLogDto,
	CreateInternalCenterTaskLogDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { CenterTaskService } from './center-task.service';

@ApiTags('task-management/center-task')
@Controller('task-management/center-task')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class CenterTaskController {
	constructor(private service: CenterTaskService) {}

	@Post()
	@Serialize<CenterTaskModel>(CenterTaskModel)
	createCenterTask(@Body() body: CreateCenterTaskDto, @IdentifyAccount() account: Account) {
		return this.service.createCenterTask(body, account);
	}

	@Get('for-child')
	getCenterTaskForChild(@Query() query: GetCenterTaskForChildDto, @IdentifyAccount() account: Account) {
		return this.service.getCenterTaskForChild(query, account);
	}

	@Get('many-center-task')
	@Serialize<PaginationModel<CenterTaskModel>>(PaginationModel<CenterTaskModel>)
	getManyCenterTask(@Query() query: GetManyCenterTaskDto) {
		return this.service.getManyCenterTask(query);
	}

	@Get(':id')
	@Serialize<CenterTaskModel>(CenterTaskModel)
	getOneCenterTask(@Param('id') id: string) {
		return this.service.getOneCenterTask(+id);
	}

	@Delete(':id')
	deleteCenterTask(@Param('id') id: string) {
		return this.service.deleteCenterTask(+id);
	}

	@Put(':id')
	updateCenterTask(@Body() body: UpdateCenterTaskDto, @Param('id') id: string) {
		return this.service.updateCenterTask(body, +id);
	}

	@Post('external-center-task-log/:childId')
	createExternalCenterTaskLog(@Body() body: CreateExternalCenterTaskLogDto, @Param('childId') childId: string) {
		return this.service.createExternalCenterTaskLog(body, +childId);
	}

	@Post('internal-center-task-log')
	createInternalCenterTaskLog(@Body() body: CreateInternalCenterTaskLogDto, @IdentifyAccount() account: Account) {
		return this.service.createInternalCenterTaskLog(body, account);
	}

	@Get('internal-center-task-log/:childId')
	@Serialize<PaginationModel<InternalCenterTaskLogModel>>(PaginationModel<InternalCenterTaskLogModel>)
	getInternalCenterTaskLog(@Query() query: GetInternalCenterTaskLogDto, @Param('childId') childId: string) {
		return this.service.getInternalCenterTaskLog(query, +childId);
	}

	@Get('details-internal-center-task-log/:childId/:taskId')
	getDetailsInternalCenterTaskLog(@Param('taskId') taskId: string, @Param('childId') childId: string) {
		return this.service.getDetailsInternalCenterTaskLog(+taskId, +childId);
	}

	@Get('external-center-task-log/:childId')
	getExternalCenterTaskLog(@Query() query: GetExternalCenterTaskLogDto, @Param('childId') childId: string) {
		return this.service.getExternalCenterTaskLog(query, +childId);
	}

	@Get('class-center-task/:classId')
	@Serialize<PaginationModel<CenterTaskModel>>(PaginationModel<CenterTaskModel>)
	getClassCenterTask(@Query() query: GetClassCenterTaskDto, @Param('classId') classId: string) {
		return this.service.getClassCenterTask(query, +classId);
	}
}
