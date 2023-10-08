import { Test } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
	let service: AccountService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [AccountService]
		}).compile();

		service = module.get(AccountService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
