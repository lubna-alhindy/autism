import { Test } from '@nestjs/testing';
import { TimeLearningController } from './time-learning.controller';
import { TimeLearningService } from './time-learning.service';

describe('TimeLearningController', () => {
	let controller: TimeLearningController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [TimeLearningService],
			controllers: [TimeLearningController]
		}).compile();

		controller = module.get(TimeLearningController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
