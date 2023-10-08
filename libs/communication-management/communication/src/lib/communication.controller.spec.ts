import { Test } from '@nestjs/testing';
import { CommunicationController } from './communication.controller';
import { CommunicationService } from './communication.service';

describe('CommunicationController', () => {
	let controller: CommunicationController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [CommunicationService],
			controllers: [CommunicationController]
		}).compile();

		controller = module.get(CommunicationController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
