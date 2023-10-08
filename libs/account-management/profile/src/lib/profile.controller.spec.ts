import { Test } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

describe('ProfileController', () => {
	let controller: ProfileController;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [ProfileService],
			controllers: [ProfileController]
		}).compile();

		controller = module.get(ProfileController);
	});

	it('should be defined', () => {
		expect(controller).toBeTruthy();
	});
});
