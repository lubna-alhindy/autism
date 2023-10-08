import { Test } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';

describe('NoteController', () => {
	let controller: NoteController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [NoteService],
			controllers: [NoteController]
		}).compile();

		controller = module.get(NoteController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
