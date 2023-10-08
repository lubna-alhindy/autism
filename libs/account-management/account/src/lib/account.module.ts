import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import {
	Child,
	Account,
	Profile,
	Teacher,
	Specialist,
	Supervisor,
	ChildNeedLevel,
	RolePermission
} from '@autism/shared/type';
import { jwtConstants } from '@autism/shared/util';

import { LocalStrategy } from './strategies/local.strategy';
import { AccountController } from './account.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountService } from './account.service';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '30d' }
		}),
		TypeOrmModule.forFeature([Child, Account, Profile, Teacher, Specialist, Supervisor, ChildNeedLevel, RolePermission])
	],
	controllers: [AccountController],
	providers: [AccountService, LocalStrategy, JwtStrategy],
	exports: [AccountService]
})
export class AccountModule {}
