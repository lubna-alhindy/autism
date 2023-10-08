import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Account, CenterNote, Child, Class, FamilyNote, RolePermission } from '@autism/shared/type';

import { NoteController } from './note.controller';
import { NoteService } from './note.service';

@Module({
	imports: [TypeOrmModule.forFeature([RolePermission, FamilyNote, CenterNote, Child, Account, Class])],
	controllers: [NoteController],
	providers: [NoteService],
	exports: [NoteService]
})
export class NoteModule {}
