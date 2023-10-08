import { Account } from '../entities';

export class JWTPayloadModel {
	sub!: Account;
	iat!: number;
	exp!: number;
}
