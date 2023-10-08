import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Message, Account, RolePermission } from '@autism/shared/type';

import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';

@Module({
	imports: [TypeOrmModule.forFeature([RolePermission, Message, Account])],
	controllers: [CommunicationController],
	providers: [CommunicationService],
	exports: [CommunicationService]
})
export class CommunicationModule {}
