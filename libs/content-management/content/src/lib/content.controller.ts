import { Body, Controller, Delete, Post, UseGuards, Param, Get } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { ApiTags } from '@nestjs/swagger';

import {
	Content,
	GetOneContentModel,
	CreateWordContentDto,
	CreateSoundContentDto,
	CreateImageContentDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { ContentService } from './content.service';

@Controller('content')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
@ApiTags('content-management')
export class ContentController {
	constructor(private contentService: ContentService) {}

	@Get('get-sounds')
	getSounds() {
		return this.contentService.getSounds();
	}

	@Get(':id')
	@Serialize<GetOneContentModel>(GetOneContentModel)
	getOneContent(@Param('id') id: string) {
		return this.contentService.getOneContent(+id);
	}

	@Post('word')
	@FormDataRequest()
	@Serialize<Content>(Content)
	createWordContent(@Body() body: CreateWordContentDto) {
		return this.contentService.createWordContent(body);
	}

	@Post('image')
	@FormDataRequest()
	@Serialize<Content>(Content)
	createImageContent(@Body() body: CreateImageContentDto) {
		return this.contentService.createImageContent(body);
	}

	@Post('sound')
	@FormDataRequest()
	@Serialize<Content>(Content)
	createSoundContent(@Body() body: CreateSoundContentDto) {
		return this.contentService.createSoundContent(body);
	}

	@Delete(':id')
	deleteContent(@Param('id') id: string) {
		return this.contentService.deleteContent(+id);
	}
}
