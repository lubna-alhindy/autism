import { Test } from '@nestjs/testing';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

describe('ClassManagementClassController', () => {
	let controller: ClassController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ClassService],
			controllers: [ClassController]
		}).compile();

		controller = module.get(ClassController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
