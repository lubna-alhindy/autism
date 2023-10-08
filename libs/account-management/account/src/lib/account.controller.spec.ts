import { Test } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

describe('AccountController', () => {
	let controller: AccountController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [AccountService],
			controllers: [AccountController]
		}).compile();

		controller = module.get(AccountController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
