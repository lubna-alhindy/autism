import { Test } from '@nestjs/testing';
import { TimeLearningService } from './time-learning.service';

describe('TimeLearningService', () => {
	let service: TimeLearningService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [TimeLearningService]
		}).compile();

		service = module.get(TimeLearningService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
