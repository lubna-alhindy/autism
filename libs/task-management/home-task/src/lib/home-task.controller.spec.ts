import { Test } from '@nestjs/testing';
import { HomeTaskController } from './home-task.controller';
import { HomeTaskService } from './home-task.service';

describe('HomeTaskController', () => {
	let controller: HomeTaskController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [HomeTaskService],
			controllers: [HomeTaskController]
		}).compile();

		controller = module.get(HomeTaskController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
