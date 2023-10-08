import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import {
	Child,
	Pep3Age,
	Profile,
	Pep3Test,
	Pep3Domain,
	Pep3Answer,
	Pep3Question,
	RolePermission,
	ProfileOfDevelopmentalAge
} from '@autism/shared/type';

import { Pep3TestController } from './pep3-test.controller';
import { Pep3TestService } from './pep3-test.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ProfileOfDevelopmentalAge,
			RolePermission,
			Pep3Question,
			Pep3Answer,
			Pep3Domain,
			Pep3Test,
			Pep3Age,
			Profile,
			Child
		])
	],
	controllers: [Pep3TestController],
	providers: [Pep3TestService],
	exports: [Pep3TestService]
})
export class Pep3TestModule {}
