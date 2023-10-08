import { Test } from '@nestjs/testing';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

describe('AuthorizationController', () => {
	let controller: AuthorizationController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [AuthorizationService],
			controllers: [AuthorizationController]
		}).compile();

		controller = module.get(AuthorizationController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
