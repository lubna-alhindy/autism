import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Permission, Role, RolePermission } from '@autism/shared/type';

import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { AuthorizationGuard } from './authorization.guard';

@Module({
	imports: [TypeOrmModule.forFeature([RolePermission, Role, Permission])],
	controllers: [AuthorizationController],
	providers: [AuthorizationService, AuthorizationGuard],
	exports: [AuthorizationService, AuthorizationGuard]
})
export class AuthorizationModule {}
