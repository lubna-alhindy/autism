import { Test } from '@nestjs/testing';
import { Pep3ManagementPep3TestController } from './pep3-management-pep3-test.controller';
import { Pep3ManagementPep3TestService } from './pep3-management-pep3-test.service';

describe('Pep3ManagementPep3TestController', () => {
	let controller: Pep3ManagementPep3TestController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [Pep3ManagementPep3TestService],
			controllers: [Pep3ManagementPep3TestController]
		}).compile();

		controller = module.get(Pep3ManagementPep3TestController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
