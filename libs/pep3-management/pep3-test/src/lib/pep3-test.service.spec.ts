import { Test } from '@nestjs/testing';
import { Pep3TestService } from './pep3-test.service';

describe('Pep3TestService', () => {
	let service: Pep3TestService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [Pep3TestService]
		}).compile();

		service = module.get(Pep3TestService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
