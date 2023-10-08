import { Test } from '@nestjs/testing';
import { DailyProgrammeController } from './daily-programme.controller';
import { DailyProgrammeService } from './daily-programme.service';

describe('DailyProgrammeController', () => {
	let controller: DailyProgrammeController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [DailyProgrammeService],
			controllers: [DailyProgrammeController]
		}).compile();

		controller = module.get(DailyProgrammeController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
