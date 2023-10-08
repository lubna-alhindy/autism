import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { isEmail, length } from 'class-validator';
import { Strategy } from 'passport-local';

import { AccountService } from '../account.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private accountService: AccountService) {
		super({
			usernameField: 'email',
			passReqToCallback: false
		});
	}

	async validate(email: string, password: string) {
		if (!isEmail(email)) {
			throw new BadRequestException('!البريد الإلكتروني غير صحيح');
		}
		if (!length(password, 8, 32)) {
			throw new BadRequestException('!خطأ في كلمة السر, يجب أن يكون طول كلمة السر بين 8 إلى 32 محرف');
		}

		const account = await this.accountService.validateUserCredentials(email, password);
		if (!account) {
			throw new BadRequestException('!البريد الإلكتروني أو كلمة السر غير صحيحة');
		}

		return account;
	}
}
