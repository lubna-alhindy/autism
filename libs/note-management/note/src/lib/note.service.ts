import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import {
	Class,
	Child,
	Account,
	CenterNote,
	FamilyNote,
	GetCenterNoteDto,
	GetFamilyNoteDto,
	CreateCenterNoteDto,
	CreateFamilyNoteDto
} from '@autism/shared/type';
import { getPagination } from '@autism/shared/util';
import { allowedToUse } from '@autism/account-management/authorization';

@Injectable()
export class NoteService {
	constructor(
		@InjectRepository(CenterNote) private centerNoteRepo: Repository<CenterNote>,
		@InjectRepository(FamilyNote) private familyNoteRepo: Repository<FamilyNote>,
		@InjectRepository(Account) private accountRepo: Repository<Account>,
		@InjectRepository(Child) private childRepo: Repository<Child>,
		@InjectRepository(Class) private classRepo: Repository<Class>
	) {}

	async getCenterNotes(query: GetCenterNoteDto, childId: number) {
		const { take, skip } = getPagination(query.page, query.limit);
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود في النظام');
		}

		const [notes, total] = await this.centerNoteRepo.findAndCount({
			skip,
			take,
			where: {
				child: {
					id: child.id
				},
				note: Like(`%${query.word ? query.word : ''}%`)
			},
			relations: ['createdBy', 'createdBy.profile'],
			order: {
				createdAt: 'DESC'
			}
		});

		return {
			data: notes,
			count: notes.length,
			total: total,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getFamilyNotes(query: GetFamilyNoteDto, childId: number) {
		const { take, skip } = getPagination(query.page, query.limit);
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود في النظام');
		}

		const [notes, total] = await this.familyNoteRepo.findAndCount({
			skip,
			take,
			where: {
				child: {
					id: child.id
				},
				note: Like(`%${query.word ? query.word : ''}%`)
			},
			order: {
				createdAt: 'DESC'
			}
		});

		return {
			data: notes,
			count: notes.length,
			total: total,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async createCenterNote(body: CreateCenterNoteDto, requestOwnerAccount: Account) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: body.childAccountId
				}
			},
			relations: ['account', 'classChild', 'classChild.cls']
		});
		if (!child) {
			throw new NotFoundException('!الحساب غير موجود ');
		}

		if (child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		if (!child.classChild) {
			throw new NotFoundException('!الطفل غير موجود في الصف');
		}

		const classTeacher = await this.classRepo.findOne({
			where: [
				{
					id: child.classChild.cls.id,
					classSpecialist: {
						specialist: {
							account: {
								id: requestOwnerAccount.id
							}
						}
					}
				},
				{
					id: child.classChild.cls.id,
					classTeacher: {
						teacher: {
							account: {
								id: requestOwnerAccount.id
							}
						}
					}
				}
			]
		});
		if (!classTeacher) {
			throw new BadRequestException('!لا يمكن لهذا المعلم او الأخصائي إضافة ملاحظة عن هذا الطفل');
		}

		return this.centerNoteRepo.save(
			this.centerNoteRepo.create({
				note: body.note,
				child: {
					id: child.id
				},
				createdBy: {
					id: requestOwnerAccount.id
				}
			})
		);
	}

	async createFamilyNote(body: CreateFamilyNoteDto, requestOwnerAccount: Account) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: body.childAccountId
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود في النظام');
		}
		if (!allowedToUse(requestOwnerAccount, child.account.id)) {
			throw new UnauthorizedException('!غير مصرح لك بتعديل هذا العنصر');
		}
		if (child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		return this.familyNoteRepo.save(
			this.familyNoteRepo.create({
				note: body.note,
				child: {
					id: child.id
				}
			})
		);
	}

	async deleteCenterNote(id: number) {
		const note = await this.centerNoteRepo.findOne({
			where: {
				id: id
			}
		});
		if (!note) {
			throw new NotFoundException('!الملاحظة غير موجودة في النظام');
		}
		await this.centerNoteRepo.softRemove(note);
		return null;
	}

	async deleteFamilyNote(id: number) {
		const note = await this.familyNoteRepo.findOne({
			where: {
				id: id
			}
		});
		if (!note) {
			throw new NotFoundException('!الملاحظة غير موجودة في النظام');
		}
		await this.familyNoteRepo.softRemove(note);
		return null;
	}

	async getCenterNote(id: number) {
		const note = await this.centerNoteRepo.findOne({
			where: {
				id: id
			},
			relations: ['createdBy', 'createdBy.profile']
		});
		if (!note) {
			throw new NotFoundException('!الملاحظة غير موجودة في النظام');
		}
		return note;
	}

	async getFamilyNote(id: number) {
		const note = await this.familyNoteRepo.findOne({
			where: {
				id: id
			}
		});
		if (!note) {
			throw new NotFoundException('!الملاحظة غير موجودة في النظام');
		}
		return note;
	}
}
