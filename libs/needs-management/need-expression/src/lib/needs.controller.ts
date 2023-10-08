import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Need,
	Account,
	NeedModel,
	ChildNeedLog,
	CreateNeedDto,
	ChildNeedLevel,
	GetManyNeedDto,
	PaginationModel,
	AddSoundToNeedDto,
	ChildNeedLogModel,
	GetChildNeedLogDto,
	MarkNeedOfChildDoneDto,
	UpdateChildNeedLevelDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { NeedsService } from './needs.service';

@Controller('needs')
@ApiTags('needs-management')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class NeedsController {
	constructor(private needsService: NeedsService) {}

	@Get('child-need-levels')
	getChildNeedLevels() {
		return this.needsService.getChildNeedLevels();
	}

	@Post()
	@Serialize<Need>(Need)
	createNeed(@Body() body: CreateNeedDto) {
		return this.needsService.createNeed(body);
	}

	@Get('by-parent/:parentId')
	getManyNeed(@Query() query: GetManyNeedDto, @Param('parentId') parentId: string) {
		return this.needsService.getManyNeed(query, +parentId);
	}

	@Get(':id')
	@Serialize<NeedModel>(NeedModel)
	getOneNeed(@Param('id') id: string) {
		return this.needsService.getOneNeed(+id);
	}

	@Get('child-need-log/:accountId')
	@Serialize<PaginationModel<ChildNeedLogModel>>(PaginationModel<ChildNeedLogModel>)
	getChildNeedLog(@Query() query: GetChildNeedLogDto, @Param('accountId') accountId: string) {
		return this.needsService.getChildNeedLog(query, +accountId);
	}

	@Delete(':id')
	deleteNeed(@Param('id') id: string) {
		return this.needsService.deleteNeed(+id);
	}

	@Post('need-to-child-need-log/:needId')
	addChildNeed(@Param('needId') needId: string, @IdentifyAccount() account: Account) {
		return this.needsService.addChildNeed(+needId, account);
	}

	@Put('update-child-need-level/:childId')
	@Serialize<ChildNeedLevel>(ChildNeedLevel)
	updateChildNeedLevel(
		@Param('childId') childId: string,
		@Body() body: UpdateChildNeedLevelDto,
		@IdentifyAccount() account: Account
	) {
		return this.needsService.updateChildNeedLevel(body, +childId, account);
	}

	@Post('mark-child-need-done')
	@Serialize<ChildNeedLog>(ChildNeedLog)
	markNeedOfChildDone(@Body() body: MarkNeedOfChildDoneDto, @IdentifyAccount() account: Account) {
		return this.needsService.markNeedOfChildDone(body, account);
	}

	@Post('mark-all-child-need-done/:childId')
	@Serialize<ChildNeedLog>(ChildNeedLog)
	markAllNeedOfChildDone(@Param('childId') childId: string, @IdentifyAccount() account: Account) {
		return this.needsService.markAllNeedOfChildDone(+childId, account);
	}

	@Post('add-sound-to-need/:needId')
	addSoundToNeed(@Body() body: AddSoundToNeedDto, @Param('needId') needId: string) {
		return this.needsService.addSoundToNeed(body, +needId);
	}
}
