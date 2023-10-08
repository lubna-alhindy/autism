import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Account,
	HomeTaskModel,
	PaginationModel,
	UpdateHomeTaskDto,
	CreateHomeTaskDto,
	GetManyHomeTaskDto,
	GetClassHomeTaskDto,
	GetHomeTaskForChildDto,
	InternalHomeTaskLogModel,
	GetInternalHomeTaskLogDto,
	GetExternalHomeTaskLogDto,
	CreateExternalHomeTaskLogDto,
	CreateInternalHomeTaskLogDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { HomeTaskService } from './home-task.service';

@ApiTags('task-management/home-task')
@Controller('task-management/home-task')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class HomeTaskController {
	constructor(private service: HomeTaskService) {}

	@Post()
	@Serialize<HomeTaskModel>(HomeTaskModel)
	createHomeTask(@Body() body: CreateHomeTaskDto, @IdentifyAccount() account: Account) {
		return this.service.createHomeTask(body, account);
	}

	@Get('for-child')
	getHomeTaskForChild(@Query() query: GetHomeTaskForChildDto, @IdentifyAccount() account: Account) {
		return this.service.getHomeTaskForChild(query, account);
	}

	@Get('many-home-task')
	@Serialize<PaginationModel<HomeTaskModel>>(PaginationModel<HomeTaskModel>)
	getManyHomeTask(@Query() query: GetManyHomeTaskDto) {
		return this.service.getManyHomeTask(query);
	}

	@Get(':id')
	@Serialize<HomeTaskModel>(HomeTaskModel)
	getOneHomeTask(@Param('id') id: string) {
		return this.service.getOneHomeTask(+id);
	}

	@Delete(':id')
	deleteHomeTask(@Param('id') id: string) {
		return this.service.deleteHomeTask(+id);
	}

	@Put(':id')
	updateHomeTask(@Body() body: UpdateHomeTaskDto, @Param('id') id: string) {
		return this.service.updateHomeTask(body, +id);
	}

	@Post('external-home-task-log')
	createExternalHomeTaskLog(@Body() body: CreateExternalHomeTaskLogDto, @IdentifyAccount() account: Account) {
		return this.service.createExternalHomeTaskLog(body, account);
	}

	@Post('internal-home-task-log')
	createInternalHomeTaskLog(@Body() body: CreateInternalHomeTaskLogDto, @IdentifyAccount() account: Account) {
		return this.service.createInternalHomeTaskLog(body, account);
	}

	@Get('internal-home-task-log/:childId')
	@Serialize<PaginationModel<InternalHomeTaskLogModel>>(PaginationModel<InternalHomeTaskLogModel>)
	getInternalHomeTaskLog(@Query() query: GetInternalHomeTaskLogDto, @Param('childId') childId: string) {
		return this.service.getInternalHomeTaskLog(query, +childId);
	}

	@Get('details-internal-home-task-log/:childId/:taskId')
	getDetailsInternalHomeTaskLog(@Param('taskId') taskId: string, @Param('childId') childId: string) {
		return this.service.getDetailsInternalHomeTaskLog(+taskId, +childId);
	}

	@Get('external-home-task-log/:childId')
	getExternalHomeTaskLog(@Query() query: GetExternalHomeTaskLogDto, @Param('childId') childId: string) {
		return this.service.getExternalHomeTaskLog(query, +childId);
	}

	@Get('class-home-task/:classId')
	@Serialize<PaginationModel<HomeTaskModel>>(PaginationModel<HomeTaskModel>)
	getClassHomeTask(@Query() query: GetClassHomeTaskDto, @Param('classId') classId: string) {
		return this.service.getClassHomeTask(query, +classId);
	}
}
