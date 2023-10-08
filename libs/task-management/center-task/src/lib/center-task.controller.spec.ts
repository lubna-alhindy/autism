import { Test } from '@nestjs/testing';
import { CenterTaskController } from './center-task.controller';
import { CenterTaskService } from './center-task.service';

describe('CenterTaskController', () => {
	let controller: CenterTaskController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [CenterTaskService],
			controllers: [CenterTaskController]
		}).compile();

		controller = module.get(CenterTaskController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
