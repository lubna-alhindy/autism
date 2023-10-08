import { Body, Controller, Get, Param, Post, UseGuards, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Account,
	Pep3Test,
	Pep3Question,
	CreatePep3TestDto,
	CreatePep3TestModel,
	SubmitDomainAnswersDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { Pep3TestService } from './pep3-test.service';

@Controller('pep3-test')
@ApiTags('pep3-management')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class Pep3TestController {
	constructor(private pep3TestService: Pep3TestService) {}

	@Get('domain')
	getPep3Domain() {
		return this.pep3TestService.getPep3Domain();
	}

	@Get('question/:domainId')
	@Serialize<Pep3Question>(Pep3Question)
	getPep3Question(@Param('domainId') domainId: string) {
		return this.pep3TestService.getPep3Question(+domainId);
	}

	@Get('child-tests/:childId')
	@Serialize<Pep3Test>(Pep3Test)
	getPep3Tests(@Param('childId') childId: string, @IdentifyAccount() account: Account) {
		return this.pep3TestService.getPep3Tests(+childId, account);
	}

	@Post()
	@Serialize<CreatePep3TestModel>(CreatePep3TestModel)
	createPep3Test(@Body() body: CreatePep3TestDto) {
		return this.pep3TestService.createPep3Test(body);
	}

	@Put('submit-domain-answers/:pep3TestId')
	submitDomainAnswers(@Body() body: SubmitDomainAnswersDto, @Param('pep3TestId') pep3TestId: string) {
		return this.pep3TestService.submitDomainAnswers(body, +pep3TestId);
	}

	@Post('submit-pep3-test/:pep3TestId')
	submitPep3Test(@Param('pep3TestId') pep3TestId: string) {
		return this.pep3TestService.submitPep3Test(+pep3TestId);
	}

	@Get('result/:pep3TestId')
	getPep3TestResult(@Param('pep3TestId') pep3TestId: string) {
		return this.pep3TestService.getPep3TestResult(+pep3TestId);
	}

	@Get('answers-of-domain/:pep3TestId/:domainId')
	getAnswersOfDomain(@Param('pep3TestId') pep3TestId: string, @Param('domainId') domainId: string) {
		return this.pep3TestService.getAnswersOfDomain(+pep3TestId, +domainId);
	}

	@Delete(':pep3TestId')
	deletePep3Test(@Param('pep3TestId') pep3TestId: string) {
		return this.pep3TestService.deletePep3Test(+pep3TestId);
	}
}
