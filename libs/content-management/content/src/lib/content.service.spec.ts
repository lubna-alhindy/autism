import { Test } from '@nestjs/testing';
import { ContentService } from './content.service';

describe('ContentManagementContentService', () => {
	let service: ContentService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ContentService]
		}).compile();

		service = module.get(ContentService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
