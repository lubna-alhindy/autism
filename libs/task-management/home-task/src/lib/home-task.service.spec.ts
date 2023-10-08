import { Test } from '@nestjs/testing';
import { HomeTaskService } from './home-task.service';

describe('HomeTaskService', () => {
	let service: HomeTaskService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [HomeTaskService]
		}).compile();

		service = module.get(HomeTaskService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
