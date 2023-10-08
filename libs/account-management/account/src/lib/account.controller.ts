import { Query, Body, Delete, Controller, Get, Param, Post, UseGuards, Request, Put } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import {
	Account,
	LoginDto,
	LoginModel,
	RegisterDto,
	PaginationModel,
	ResetPasswordDto,
	UpdatePasswordDto,
	LoginRequestModel,
	GetManyAccountDto,
	UpdateFamilyPasswordDto
} from '@autism/shared/type';
import { JWTAuthGuard, LocalAuthGuard } from '@autism/shared/guard';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard, getUserAgent } from '@autism/account-management/authorization';

import { AccountService } from './account.service';

@Controller('account')
@ApiTags('account-management')
export class AccountController {
	constructor(private accountService: AccountService) {}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	@ApiBody({ type: LoginDto })
	@Serialize<LoginModel>(LoginModel)
	login(@Request() req: LoginRequestModel) {
		return this.accountService.login(req.user, getUserAgent(req));
	}

	@Post('register')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	@Serialize<Account>(Account)
	register(@Body() body: RegisterDto, @IdentifyAccount() account: Account) {
		return this.accountService.register(body, account);
	}

	@Get()
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	@Serialize<PaginationModel<Account>>(PaginationModel<Account>)
	getManyAccount(@Query() query: GetManyAccountDto, @IdentifyAccount() account: Account) {
		return this.accountService.getManyAccount(query, account);
	}

	@Get('me')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	@Serialize<Account>(Account)
	getMe(@IdentifyAccount() account: Account) {
		return this.accountService.getOneAccount(account.id);
	}

	@Get(':accountId')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	@Serialize<Account>(Account)
	getAccount(@Param('accountId') accountId: string) {
		return this.accountService.getOneAccount(+accountId);
	}

	@Delete(':accountId')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	deleteAccount(@Param('accountId') accountId: string) {
		return this.accountService.deleteAccount(+accountId);
	}

	@Put('child/family-password/:accountId')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	updateFamilyPassword(
		@Body() body: UpdateFamilyPasswordDto,
		@Param('accountId') accountId: string,
		@IdentifyAccount() account: Account
	) {
		return this.accountService.updateFamilyPassword(body, +accountId, account);
	}

	@Put('update-password/:accountId')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	updatePassword(
		@Body() body: UpdatePasswordDto,
		@Param('accountId') accountId: string,
		@IdentifyAccount() account: Account
	) {
		return this.accountService.updatePassword(body, +accountId, account);
	}

	@Put('reset-password/:accountId')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	resetPassword(
		@Body() body: ResetPasswordDto,
		@Param('accountId') accountId: string,
		@IdentifyAccount() account: Account
	) {
		return this.accountService.resetPassword(body, +accountId, account);
	}

	@Post('block/:accountId')
	@UseGuards(JWTAuthGuard, AuthorizationGuard)
	blockAccount(@Param('accountId') accountId: string) {
		return this.accountService.blockAccount(+accountId);
	}
}
