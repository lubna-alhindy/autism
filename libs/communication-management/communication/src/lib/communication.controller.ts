import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '@autism/shared/guard';
import { ApiTags } from '@nestjs/swagger';

import {
	Message,
	Account,
	GetOneChatDto,
	GetManyChatDto,
	PaginationModel,
	CreateMessageDto,
	GetManyChatModel
} from '@autism/shared/type';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { CommunicationService } from './communication.service';

@ApiTags('communication-management/communication')
@Controller('communication-management/communication')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class CommunicationController {
	constructor(private service: CommunicationService) {}

	@Post('message/:otherAccountId')
	createMessage(
		@Body() body: CreateMessageDto,
		@Param('otherAccountId') otherAccountId: string,
		@IdentifyAccount() account: Account
	) {
		return this.service.createMessage(body, +otherAccountId, account);
	}

	@Get('chats')
	@Serialize<PaginationModel<GetManyChatModel>>(PaginationModel<GetManyChatModel>)
	getManyChat(@Query() query: GetManyChatDto, @IdentifyAccount() account: Account) {
		return this.service.getManyChat(query, account);
	}

	@Get('number-of-unread-message')
	getNumberOfUnreadMessage(@IdentifyAccount() account: Account) {
			return this.service.getNumberOfUnreadMessage(account);
	}

	@Get(':otherAccountId')
	@Serialize<PaginationModel<Message>>(PaginationModel<Message>)
	getOneChat(
		@Query() query: GetOneChatDto,
		@Param('otherAccountId') otherAccountId: string,
		@IdentifyAccount() account: Account
	) {
		return this.service.getOneChat(query, +otherAccountId, account);
	}

}
