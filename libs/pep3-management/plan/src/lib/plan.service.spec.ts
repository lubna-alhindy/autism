import { Test } from '@nestjs/testing';
import { PlanService } from './plan.service';

describe('PlanService', () => {
	let service: PlanService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [PlanService]
		}).compile();

		service = module.get(PlanService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
