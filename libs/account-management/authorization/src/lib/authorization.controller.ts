import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IdentifyAccount } from '@autism/shared/decorator';
import { JWTAuthGuard } from '@autism/shared/guard';
import { Account } from '@autism/shared/type';

import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from './authorization.guard';

@ApiTags('account-management/authorization')
@Controller('account-management/authorization')
export class AuthorizationController {
	constructor(private service: AuthorizationService) {}

	@Get('is-allowed')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	getIsAllowed(@IdentifyAccount() account: Account) {
		return this.service.getIsAllowed(account.accountType);
	}
}
