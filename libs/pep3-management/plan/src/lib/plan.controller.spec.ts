import { Test } from '@nestjs/testing';
import { PlanController } from './plan.controller';
import { PlanService } from './plan.service';

describe('PlanController', () => {
	let controller: PlanController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [PlanService],
			controllers: [PlanController]
		}).compile();

		controller = module.get(PlanController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
