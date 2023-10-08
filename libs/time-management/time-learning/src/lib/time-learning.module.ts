import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Child, ChildTimeExercise, ChildTimeExerciseLog, ChildWaitingTime, RolePermission } from '@autism/shared/type';
import { ExerciseModule } from '@autism/task-management/exercise';

import { TimeLearningController } from './time-learning.controller';
import { TimeLearningService } from './time-learning.service';

@Module({
	imports: [
		ExerciseModule,
		TypeOrmModule.forFeature([RolePermission, Child, ChildTimeExercise, ChildTimeExerciseLog, ChildWaitingTime])
	],
	controllers: [TimeLearningController],
	providers: [TimeLearningService],
	exports: [TimeLearningService]
})
export class TimeLearningModule {}
