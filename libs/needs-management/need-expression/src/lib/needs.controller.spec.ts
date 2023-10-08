import { Test } from '@nestjs/testing';
import { NeedsController } from './needs.controller';
import { NeedsService } from './needs.service';

describe('NeedsController', () => {
	let controller: NeedsController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [NeedsService],
			controllers: [NeedsController]
		}).compile();

		controller = module.get(NeedsController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
