import { Post, Body, Param, UseGuards, Controller, Put } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiTags } from '@nestjs/swagger';

import { SwitchAccountDto, Account, UpdateProfileDto } from '@autism/shared/type';
import { AuthorizationGuard } from '@autism/account-management/authorization';
import { IdentifyAccount } from '@autism/shared/decorator';
import { JWTAuthGuard } from '@autism/shared/guard';

import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('account-management')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class ProfileController {
	constructor(private profileService: ProfileService) {}

	@Put(':accountId')
	@FormDataRequest()
	updateProfile(
		@Body() body: UpdateProfileDto,
		@Param('accountId') accountId: string,
		@IdentifyAccount() account: Account
	) {
		return this.profileService.updateProfile(body, +accountId, account);
	}

	@Post('switch-account')
	switchAccount(@Body() body: SwitchAccountDto, @IdentifyAccount() account: Account) {
		return this.profileService.switchAccount(body, account);
	}
}
