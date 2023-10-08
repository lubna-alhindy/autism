import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
	Time,
	Exercise,
	Matching,
	NumberOrder,
	NumberCompare,
	RolePermission,
	StatementComposition
} from '@autism/shared/type';

import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			StatementComposition,
			RolePermission,
			NumberCompare,
			NumberOrder,
			Exercise,
			Matching,
			Time
		])
	],
	controllers: [ExerciseController],
	providers: [ExerciseService],
	exports: [ExerciseService]
})
export class ExerciseModule {}
