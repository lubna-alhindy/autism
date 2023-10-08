import { Expose } from 'class-transformer';

import { Account } from '../../../account-management';

export class GetCenterNoteModel {
	@Expose()
	id!: number;

	@Expose()
	note!: string;

	@Expose()
	createdBy!: Account;

	@Expose()
	createdAt!: Date;
}
