import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Plan,
	UpdatePlanDto,
	PaginationModel,
	GetChildPlansDto,
	EvaluatePlanGoalDto,
	GeneratePep3TestPlanDto,
	GetPlanProgressiveReportDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { PlanService } from './plan.service';

@Controller('plan')
@ApiTags('pep3-management')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class PlanController {
	constructor(private service: PlanService) {}

	@Post()
	generatePep3TestPlan(@Body() body: GeneratePep3TestPlanDto) {
		return this.service.generatePep3TestPlan(body);
	}

	@Post('evaluate-plan-goal/:goalId')
	evaluatePlanGoal(@Body() body: EvaluatePlanGoalDto, @Param('goalId') goalId: string) {
		return this.service.evaluatePlanGoal(body, +goalId);
	}

	@Put(':planId')
	updatePlan(@Body() body: UpdatePlanDto, @Param('planId') planId: string) {
		return this.service.updatePlan(body, +planId);
	}

	@Delete(':planId')
	deletePlan(@Param('planId') planId: string) {
		return this.service.deletePlan(+planId);
	}

	@Get(':planId')
	getOnePlan(@Param('planId') planId: string) {
		return this.service.getOnePlan(+planId);
	}

	@Get('pep3-test-plan/:pep3TestId')
	getPep3TestPlan(@Param('pep3TestId') pep3TestId: string) {
		return this.service.getPep3TestPlan(+pep3TestId);
	}

	@Get('child-plan/:childId')
	getChildPlan(@Param('childId') childId: string) {
		return this.service.getChildPlan(+childId);
	}

	@Get('child-plans/:childId')
	@Serialize<PaginationModel<Plan>>(PaginationModel<Plan>)
	getChildPlans(@Query() query: GetChildPlansDto, @Param('childId') childId: string) {
		return this.service.getChildPlans(query, +childId);
	}

	@Get('plan-progressive-report/:planId')
	getPlanProgressiveReport(@Query() query: GetPlanProgressiveReportDto, @Param('planId') planId: string) {
		return this.service.getPlanProgressiveReport(query, +planId);
	}

	@Get('unrealized-goal/:domainId/:planId')
	getUnrealizedGoal(@Param('domainId') domainId: string, @Param('planId') planId: string) {
		return this.service.getUnrealizedGoal(+domainId, +planId);
	}
}
