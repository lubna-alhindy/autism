import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Plan, Goal, Child, Pep3Test, Pep3Question, RolePermission } from '@autism/shared/type';
import { Pep3TestModule } from '@autism/pep3-management/pep3-test';

import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

@Module({
	imports: [TypeOrmModule.forFeature([RolePermission, Plan, Goal, Child, Pep3Test, Pep3Question]), Pep3TestModule],
	controllers: [PlanController],
	providers: [PlanService],
	exports: [PlanService]
})
export class PlanModule {}
