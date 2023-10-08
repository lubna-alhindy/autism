import { Test } from '@nestjs/testing';
import { CommunicationService } from './communication.service';

describe('CommunicationService', () => {
	let service: CommunicationService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [CommunicationService]
		}).compile();

		service = module.get(CommunicationService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
