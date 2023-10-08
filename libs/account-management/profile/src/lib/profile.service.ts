import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Profile, Child, SwitchAccountDto, Account, UpdateProfileDto } from '@autism/shared/type';
import { deleteAssetFile, writeAssetFile } from '@autism/shared/util';
import { allowedToUse } from '@autism/account-management/authorization';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Child) private childRepository: Repository<Child>,
		@InjectRepository(Profile) private profileRepository: Repository<Profile>
	) {}

	async updateProfile(body: UpdateProfileDto, accountId: number, requestOwnerAccount: Account) {
		if (body.middleName === '') {
			body.middleName = null;
		}
		if (body.birthday === '') {
			body.birthday = null;
		}
		if (body.phoneNumber === '') {
			body.phoneNumber = null;
		}
		if (body.homeAddress === '') {
			body.homeAddress = null;
		}
		if (typeof body.image === 'string') {
			body.image = null;
		}

		const profile = await this.profileRepository.findOne({
			where: {
				account: {
					id: accountId
				}
			},
			relations: ['account']
		});

		if (!profile) {
			throw new NotFoundException('!الملف الشخصي غير موجود');
		}
		if (!allowedToUse(requestOwnerAccount, profile.account.id)) {
			throw new UnauthorizedException('!غير مصرح لك بتعديل هذا العنصر');
		}
		if (profile.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		if (body.image) {
			if (!body.image.originalName || !body.image.buffer) {
				throw new BadRequestException('!الصورة يجب أن تكون عبارة عن ملف');
			}

			const allowedExtension = ['png', 'jpg', 'jpeg'];
			const maxFileSize = 10 * 1024 * 1024;
			const ext = body.image.originalName.split('.').at(-1);

			if (!ext) {
				throw new BadRequestException('!الصورة يجب أن تكون عبارة عن ملف');
			}

			if (!allowedExtension.includes(ext)) {
				throw new BadRequestException('!لاحقة الصورة المدخلة غير مدعومة');
			}

			if (body.image.size > maxFileSize) {
				throw new BadRequestException('!حجم الصورة المدخلة تجاوز الحد المسموح به و هو 10 ميغا');
			}

			if (profile.image !== null) {
				deleteAssetFile('profile-image', profile.image.split('/')[profile.image.split('/').length - 1]);
			}

			body.image.originalName = `${uuidv4()}-${body.image.originalName}`;
			writeAssetFile('profile-image', body.image.originalName, body.image.buffer);

			Object.assign(profile, body);
			profile.image = `static-file/profile-image/${body.image.originalName}`;
		} else {
			Object.assign(profile, body);
		}

		return await this.profileRepository.save(profile);
	}

	async switchAccount(body: SwitchAccountDto, account: Account) {
		const child = await this.childRepository.findOne({
			where: {
				account: {
					id: account.id
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		if (child.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		if (!(await child.validatePassword(body.familyPassword))) {
			throw new BadRequestException('!كلمة السر غير صحيحة');
		}
		return null;
	}
}
