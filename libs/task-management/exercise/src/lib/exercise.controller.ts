import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	GetExercisesDto,
	PaginationModel,
	GetOneExerciseModel,
	CreateTimeExerciseDto,
	CreateMatchingExerciseDto,
	CreateNumberOrderExerciseDto,
	CreateNumberCompareExerciseDto,
	CreateStatementCompositionExerciseDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { ExerciseService } from './exercise.service';

@ApiTags('task-management/exercise')
@Controller('task-management/exercise')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class ExerciseController {
	constructor(private exerciseService: ExerciseService) {}

	@Get(':id')
	getOneExercise(@Param('id') id: string) {
		return this.exerciseService.getOneExercise(+id);
	}

	@Get()
	@Serialize<PaginationModel<GetOneExerciseModel>>(PaginationModel<GetOneExerciseModel>)
	getExercises(@Query() query: GetExercisesDto) {
		return this.exerciseService.getExercises(query);
	}

	@Post('number-order-exercise')
	@Serialize<GetOneExerciseModel>(GetOneExerciseModel)
	createNumberOrderExercise(@Body() body: CreateNumberOrderExerciseDto) {
		return this.exerciseService.createNumberOrderExercise(body);
	}

	@Post('statement-composition-exercise')
	@Serialize<GetOneExerciseModel>(GetOneExerciseModel)
	createStatementCompositionExercise(@Body() body: CreateStatementCompositionExerciseDto) {
		return this.exerciseService.createStatementCompositionExercise(body);
	}

	@Post('number-compare-exercise')
	@Serialize<GetOneExerciseModel>(GetOneExerciseModel)
	createNumberCompareExercise(@Body() body: CreateNumberCompareExerciseDto) {
		return this.exerciseService.createNumberCompareExercise(body);
	}

	@Post('matching-exercise')
	@Serialize<GetOneExerciseModel>(GetOneExerciseModel)
	createMatchingExercise(@Body() body: CreateMatchingExerciseDto) {
		return this.exerciseService.createMatchingExercise(body);
	}

	@Post('time-exercise')
	@Serialize<GetOneExerciseModel>(GetOneExerciseModel)
	createTimeExercise(@Body() body: CreateTimeExerciseDto) {
		return this.exerciseService.createTimeExercise(body);
	}

	@Delete(':id')
	deleteExercise(@Param('id') id: string) {
		return this.exerciseService.deleteExercise(+id);
	}
}
