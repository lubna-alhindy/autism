import { Test } from '@nestjs/testing';
import { NoteService } from './note.service';

describe('NoteService', () => {
	let service: NoteService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [NoteService]
		}).compile();

		service = module.get(NoteService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});
});
