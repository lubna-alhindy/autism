import { Test } from '@nestjs/testing';
import { ClassService } from './class.service';

describe('ClassManagementClassService', () => {
	let service: ClassService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ClassService]
		}).compile();

		service = module.get(ClassService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
