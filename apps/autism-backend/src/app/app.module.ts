import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ApiResponseInterceptor, IsBlockedInterceptor } from '@autism/shared/interceptor';
import { DailyProgrammeModule } from '@autism/daily-programme-management/daily-programme';
import { CommunicationModule } from '@autism/communication-management/communication';
import { AuthorizationModule } from '@autism/account-management/authorization';
import { TimeLearningModule } from '@autism/time-management/time-learning';
import { CenterTaskModule } from '@autism/task-management/center-task';
import { NeedsModule } from '@autism/needs-management/need-expression';
import { HomeTaskModule } from '@autism/task-management/home-task';
import { AccountModule } from '@autism/account-management/account';
import { ProfileModule } from '@autism/account-management/profile';
import { ContentModule } from '@autism/content-management/content';
import { Pep3TestModule } from '@autism/pep3-management/pep3-test';
import { ExerciseModule } from '@autism/task-management/exercise';
import { ClassModule } from '@autism/class-management/class';
import { PlanModule } from '@autism/pep3-management/plan';
import { NoteModule } from '@autism/note-management/note';
import { Account } from '@autism/shared/type';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '../../.env',
			isGlobal: true
		}),

		TypeOrmModule.forRoot({
			type: 'mysql',
			synchronize: false,
			autoLoadEntities: true,
			port: 3306,
			host: '127.0.0.1',
			database: 'autism',
			username: 'newuser',
			password: 'password'
		}),

		TypeOrmModule.forFeature([Account]),
		DailyProgrammeModule,
		CommunicationModule,
		AuthorizationModule,
		TimeLearningModule,
		CenterTaskModule,
		Pep3TestModule,
		ExerciseModule,
		HomeTaskModule,
		AccountModule,
		ProfileModule,
		ContentModule,
		NeedsModule,
		ClassModule,
		PlanModule,
		NoteModule
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ApiResponseInterceptor
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: IsBlockedInterceptor
		}
	]
})
export class AppModule {}
