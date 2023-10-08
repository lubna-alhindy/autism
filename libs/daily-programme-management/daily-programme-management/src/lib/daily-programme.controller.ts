import { Controller, UseGuards, Get, Param, Query, Delete, Post, Body, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Program,
	PaginationModel,
	CreateProgramDto,
	UpdateProgramDto,
	CreateActivityDto,
	GetManyProgramDto,
	UpdateActivityDto,
	GetManyActivityDto,
	GetManyActivityModel,
	GetProgramsOfActivityDto,
	GetActivitiesOfProgramDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { DailyProgrammeService } from './daily-programme.service';

@Controller('daily-program')
@ApiTags('daily-program-management')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class DailyProgrammeController {
	constructor(private dailyProgrammeService: DailyProgrammeService) {}

	@Post('activity')
	createActivity(@Body() body: CreateActivityDto) {
		return this.dailyProgrammeService.createActivity(body);
	}

	@Get('activity/:activityId')
	getOneActivity(@Param('activityId') activityId: string) {
		return this.dailyProgrammeService.getOneActivity(+activityId);
	}

	@Get('activities')
	@Serialize<PaginationModel<GetManyActivityModel>>(PaginationModel<GetManyActivityModel>)
	getManyActivity(@Query() query: GetManyActivityDto) {
		return this.dailyProgrammeService.getManyActivity(query);
	}

	@Put('activity/:activityId')
	updateActivity(@Body() body: UpdateActivityDto, @Param('activityId') activityId: string) {
		return this.dailyProgrammeService.updateActivity(body, +activityId);
	}

	@Delete('activity/:activityId')
	deleteActivity(@Param('activityId') activityId: string) {
		return this.dailyProgrammeService.deleteActivity(+activityId);
	}

	@Post('program')
	createProgram(@Body() body: CreateProgramDto) {
		return this.dailyProgrammeService.createProgram(body);
	}

	@Get('child-program/:childId')
	getChildProgram(@Param('childId') childId: string) {
		return this.dailyProgrammeService.getChildProgram(+childId);
	}

	@Get('programs')
	@Serialize<PaginationModel<Program>>(PaginationModel<Program>)
	getManyProgram(@Query() query: GetManyProgramDto) {
		return this.dailyProgrammeService.getManyProgram(query);
	}

	@Get('program/:programId')
	getProgram(@Param('programId') programId: string) {
		return this.dailyProgrammeService.getProgram(+programId);
	}

	@Put('program/:programId')
	updateProgram(@Body() body: UpdateProgramDto, @Param('programId') programId: string) {
		return this.dailyProgrammeService.updateProgram(body, +programId);
	}

	@Delete('program/:programId')
	deleteProgram(@Param('programId') programId: string) {
		return this.dailyProgrammeService.deleteProgram(+programId);
	}

	@Post('assign/:programId/:childId')
	assignProgramToChild(@Param('programId') programId: string, @Param('childId') childId: string) {
		return this.dailyProgrammeService.assignProgramToChild(+programId, +childId);
	}

	@Post('unassign/:programId/:childId')
	unAssignProgramToChild(@Param('programId') programId: string, @Param('childId') childId: string) {
		return this.dailyProgrammeService.unAssignProgramToChild(+programId, +childId);
	}

	@Get('program-activities/:programId')
	@Serialize<PaginationModel<GetManyActivityModel>>(PaginationModel<GetManyActivityModel>)
	getActivitiesOfProgram(@Query() query: GetActivitiesOfProgramDto, @Param('programId') programId: string) {
		return this.dailyProgrammeService.getActivitiesOfProgram(query, +programId);
	}

	@Get('activity-programs/:activityId')
	@Serialize<PaginationModel<Program>>(PaginationModel<Program>)
	getProgramsOfActivity(@Query() query: GetProgramsOfActivityDto, @Param('activityId') activityId: string) {
		return this.dailyProgrammeService.getProgramsOfActivity(query, +activityId);
	}
}
