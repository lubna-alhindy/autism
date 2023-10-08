import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	Account,
	FamilyNote,
	PaginationModel,
	GetCenterNoteDto,
	GetFamilyNoteDto,
	GetCenterNoteModel,
	CreateCenterNoteDto,
	CreateFamilyNoteDto
} from '@autism/shared/type';
import { JWTAuthGuard } from '@autism/shared/guard';
import { IdentifyAccount, Serialize } from '@autism/shared/decorator';
import { AuthorizationGuard } from '@autism/account-management/authorization';

import { NoteService } from './note.service';

@Controller('note')
@ApiTags('note-management')
@UseGuards(JWTAuthGuard, AuthorizationGuard)
export class NoteController {
	constructor(private noteService: NoteService) {}

	@Get('center-notes/:childId')
	@Serialize<PaginationModel<GetCenterNoteModel>>(PaginationModel<GetCenterNoteModel>)
	getCenterNotes(@Query() query: GetCenterNoteDto, @Param('childId') childId: string) {
		return this.noteService.getCenterNotes(query, +childId);
	}

	@Get('family-notes/:childId')
	@Serialize<PaginationModel<FamilyNote>>(PaginationModel<FamilyNote>)
	getFamilyNotes(@Query() query: GetFamilyNoteDto, @Param('childId') childId: string) {
		return this.noteService.getFamilyNotes(query, +childId);
	}

	@Post('center-note')
	createCenterNote(@Body() body: CreateCenterNoteDto, @IdentifyAccount() account: Account) {
		return this.noteService.createCenterNote(body, account);
	}

	@Post('family-note')
	createFamilyNote(@Body() body: CreateFamilyNoteDto, @IdentifyAccount() account: Account) {
		return this.noteService.createFamilyNote(body, account);
	}

	@Delete('center-note/:id')
	deleteCenterNote(@Param('id') id: string) {
		return this.noteService.deleteCenterNote(+id);
	}

	@Delete('family-note/:id')
	deleteFamilyNote(@Param('id') id: string) {
		return this.noteService.deleteFamilyNote(+id);
	}

	@Get('center-note/:id')
	@Serialize<GetCenterNoteModel>(GetCenterNoteModel)
	getCenterNote(@Param('id') id: string) {
		return this.noteService.getCenterNote(+id);
	}

	@Get('family-note/:id')
	getFamilyNote(@Param('id') id: string) {
		return this.noteService.getFamilyNote(+id);
	}
}
