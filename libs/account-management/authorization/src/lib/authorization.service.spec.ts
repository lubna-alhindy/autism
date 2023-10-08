import { Test } from '@nestjs/testing';
import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
	let service: AuthorizationService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [AuthorizationService]
		}).compile();

		service = module.get(AuthorizationService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
