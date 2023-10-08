import { Account } from '../entities';

export class LoginRequestModel {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	headers!: any;

	user!: Account;
}
