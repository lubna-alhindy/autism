import { Test } from '@nestjs/testing';
import { CenterTaskService } from './center-task.service';

describe('CenterTaskService', () => {
	let service: CenterTaskService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [CenterTaskService]
		}).compile();

		service = module.get(CenterTaskService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
