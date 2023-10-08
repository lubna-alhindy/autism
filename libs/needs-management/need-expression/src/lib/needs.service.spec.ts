import { Test } from '@nestjs/testing';
import {  NeedsService } from './needs.service';

describe('NeedsService', () => {
	let service: NeedsService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [NeedsService]
		}).compile();

		service = module.get(NeedsService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
