import { Expose, Type } from 'class-transformer';

import { Account } from '../entities';

export class LoginModel {
	@Expose()
	@Type(() => Account)
	account!: Account;

	@Expose()
	accessToken!: string;
}
