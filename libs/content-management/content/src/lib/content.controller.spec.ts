import { Test } from '@nestjs/testing';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

describe('ContentController', () => {
	let controller: ContentController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ContentService],
			controllers: [ContentController]
		}).compile();

		controller = module.get(ContentController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
