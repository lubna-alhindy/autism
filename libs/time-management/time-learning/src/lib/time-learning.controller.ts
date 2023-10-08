import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Account,
	PaginationModel,
	GetOneExerciseModel,
	TimeExerciseLogModel,
	GetTimeExerciseLogDto,
	GetChildTimeExercisesDto,
	CreateTimeExerciseLogDto,
	SetWaitingTimeForChildDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { TimeLearningService } from './time-learning.service';

@ApiTags('time-management/time-learning')
@Controller('time-management/time-learning')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class TimeLearningController {
	constructor(private service: TimeLearningService) {}

	@Post('time-exercise-log')
	createTimeExerciseLog(@Body() body: CreateTimeExerciseLogDto, @IdentifyAccount() account: Account) {
		return this.service.createTimeExerciseLog(body, account);
	}

	@Get('time-exercise-log/:childId')
	@Serialize<PaginationModel<TimeExerciseLogModel>>(PaginationModel<TimeExerciseLogModel>)
	getTimeExerciseLog(@Query() query: GetTimeExerciseLogDto, @Param('childId') childId: string) {
		return this.service.getTimeExerciseLog(query, +childId);
	}

	@Get('details-time-exercise-log/:childId/:timeExerciseId')
	getDetailsTimeExerciseLog(@Param('timeExerciseId') timeExerciseId: string, @Param('childId') childId: string) {
		return this.service.getDetailsTimeExerciseLog(+timeExerciseId, +childId);
	}

	@Post('assign-time-exercise-to-child/:exerciseId/:childId')
	assignTimeExerciseToChild(@Param('exerciseId') exerciseId: string, @Param('childId') childId: string) {
		return this.service.assignTimeExerciseToChild(+exerciseId, +childId);
	}

	@Post('unassign-time-exercise-from-child/:exerciseId/:childId')
	unassignTimeExerciseFromChild(@Param('exerciseId') exerciseId: string, @Param('childId') childId: string) {
		return this.service.unassignTimeExerciseFromChild(+exerciseId, +childId);
	}

	@Get('child-time-exercises/:childId')
	@Serialize<PaginationModel<GetOneExerciseModel>>(PaginationModel<GetOneExerciseModel>)
	getChildTimeExercises(@Query() query: GetChildTimeExercisesDto, @Param('childId') childId: string) {
		return this.service.getChildTimeExercises(query, +childId);
	}

	@Post('set-waiting-time-for-child/:childId')
	setWaitingTimeForChild(@Body() body: SetWaitingTimeForChildDto, @Param('childId') childId: string) {
		return this.service.setWaitingTimeForChild(body, +childId);
	}

	@Get('get-waiting-time-for-child/:childId')
	getWaitingTimeForChild(@Param('childId') childId: string) {
		return this.service.getWaitingTimeForChild(+childId);
	}
}
