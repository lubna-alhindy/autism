import { Test } from '@nestjs/testing';
import { DailyProgrammeService } from './daily-programme.service';

describe('DailyProgrammeService', () => {
	let service: DailyProgrammeService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [DailyProgrammeService]
		}).compile();

		service = module.get(DailyProgrammeService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
