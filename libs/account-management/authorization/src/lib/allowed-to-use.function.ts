import { Account } from '@autism/shared/type';

export const allowedToUse = (account: Account, objectOwnerId: number) => {
	return account.accountType === 'supervisor' || account.id === objectOwnerId;
};
