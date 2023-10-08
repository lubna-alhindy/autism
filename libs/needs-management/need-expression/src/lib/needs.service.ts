import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Like, Repository, LessThanOrEqual } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
	Need,
	Word,
	Image,
	Sound,
	Child,
	Account,
	Content,
	NeedModel,
	ChildNeedLog,
	CreateNeedDto,
	ChildNeedLevel,
	GetManyNeedDto,
	PaginationModel,
	ChildNeedLogModel,
	AddSoundToNeedDto,
	GetChildNeedLogDto,
	MarkNeedOfChildDoneDto,
	UpdateChildNeedLevelDto
} from '@autism/shared/type';
import { getPagination } from '@autism/shared/util';
import { allowedToUse } from '@autism/account-management/authorization';

@Injectable()
export class NeedsService {
	constructor(
		private dataSource: DataSource,
		@InjectRepository(Need) private needRepo: Repository<Need>,
		@InjectRepository(Word) private wordRepo: Repository<Word>,
		@InjectRepository(Sound) private soundRepo: Repository<Sound>,
		@InjectRepository(Image) private imageRepo: Repository<Image>,
		@InjectRepository(Child) private childRepo: Repository<Child>,
		@InjectRepository(Content) private contentRepo: Repository<Content>,
		@InjectRepository(ChildNeedLog) private childNeedLogRepo: Repository<ChildNeedLog>,
		@InjectRepository(ChildNeedLevel) private childNeedLevelRepo: Repository<ChildNeedLevel>
	) {}

	async createNeed(body: CreateNeedDto) {
		const content = await this.contentRepo.findOneBy({
			id: body.contentId
		});
		if (!content) {
			throw new NotFoundException('!المحتوى غير موجود في النظام');
		}

		const parent = await this.needRepo.findOneBy({
			id: body.parentId
		});
		if (!parent) {
			throw new NotFoundException('!الحاجة غير موجودة في النظام');
		}

		if (body.soundId) {
			const sound = await this.contentRepo.findOneBy({
				id: body.soundId
			});
			if (!sound) {
				throw new NotFoundException('!الصوت غير موجود في النظام');
			}
		}

		return await this.needRepo.save(
			this.needRepo.create({
				level: parent.level + 1,
				content: {
					id: body.contentId
				},
				parent: {
					id: body.parentId
				},
				sound: {
					id: body.soundId
				}
			})
		);
	}

	async getManyNeed(query: GetManyNeedDto, parentId: number): Promise<NeedModel[] | null> {
		if (!query.childLevel || query.childLevel === 3) {
			query.childLevel = Number.MAX_VALUE;
		}

		const parent = await this.needRepo.findOneBy({
			id: parentId
		});
		if (!parent) {
			throw new NotFoundException('!الحاجة غير موجودة في النظام');
		}
		if (query.childLevel <= parent.level) {
			return null;
		}

		const needs = await this.needRepo.find({
			where: {
				parent: {
					id: parentId
				},
				content: {
					contentType: query.type ? query.type : Like('%')
				},
				level: LessThanOrEqual(query.childLevel)
			},
			relations: ['content', 'sound']
		});

		const response: NeedModel[] = await Promise.all(
			needs.map(async (need) => {
				const res: NeedModel = {
					id: need.id,
					createdAt: need.createdAt,
					deletedAt: need.deletedAt,
					updatedAt: need.updatedAt,
					level: need.level
				};

				if (need.content.contentType === 'image') {
					const image = await this.imageRepo.findOneBy({
						id: need.content.mediaRowId
					});
					if (!image) {
						throw new NotFoundException('!الكلمة غير موجودة في النظام');
					}

					res.content = {
						id: need.content.id,
						createdAt: need.content.createdAt,
						contentType: need.content.contentType,
						media: {
							id: image.id,
							url: image.url,
							word: null
						}
					};
				} else if (need.content.contentType === 'word') {
					const word = await this.wordRepo.findOneBy({
						id: need.content.mediaRowId
					});
					if (!word) {
						throw new NotFoundException('!الكلمة غير موجودة في النظام');
					}

					res.content = {
						id: need.content.id,
						createdAt: need.content.createdAt,
						contentType: need.content.contentType,
						media: {
							id: word.id,
							word: word.word,
							url: null
						}
					};
				}

				if (need.sound) {
					const sound = await this.soundRepo.findOneBy({
						id: need.sound.mediaRowId
					});
					if (!sound) {
						throw new NotFoundException('!الصوت غير موجود في النظام');
					}

					res.sound = {
						id: need.sound.id,
						createdAt: need.sound.createdAt,
						contentType: need.sound.contentType,
						media: {
							id: sound.id,
							url: sound.url,
							word: null
						}
					};
				}

				return res;
			})
		);

		return response;
	}

	async getOneNeed(id: number): Promise<NeedModel> {
		const need = await this.needRepo.findOne({
			where: {
				id: id
			},
			relations: ['content', 'sound', 'parent']
		});

		if (!need) {
			throw new NotFoundException('!الحاجة غير موجودة في النظام');
		}

		const response: NeedModel = {
			id: need.id,
			parent: need.parent,
			createdAt: need.createdAt,
			deletedAt: need.deletedAt,
			updatedAt: need.updatedAt,
			level: need.level
		};

		if (need.content.contentType === 'image') {
			const image = await this.imageRepo.findOneBy({
				id: need.content.mediaRowId
			});
			if (!image) {
				throw new NotFoundException('!الصورة غير موجودة في النظام');
			}

			response.content = {
				id: need.content.id,
				createdAt: need.content.createdAt,
				contentType: need.content.contentType,
				media: {
					id: image.id,
					url: image.url,
					word: null
				}
			};
		} else if (need.content.contentType === 'word') {
			const word = await this.wordRepo.findOneBy({
				id: need.content.mediaRowId
			});
			if (!word) {
				throw new NotFoundException('!الكلمة غير موجودة في النظام');
			}

			response.content = {
				id: need.content.id,
				createdAt: need.content.createdAt,
				contentType: need.content.contentType,
				media: {
					id: word.id,
					word: word.word,
					url: null
				}
			};
		}

		if (need.sound) {
			const sound = await this.soundRepo.findOneBy({
				id: need.sound.mediaRowId
			});
			if (!sound) {
				throw new NotFoundException('!الصوت غير موجود في النظام');
			}

			response.sound = {
				id: need.sound.id,
				createdAt: need.sound.createdAt,
				contentType: need.sound.contentType,
				media: {
					id: sound.id,
					url: sound.url,
					word: null
				}
			};
		}

		return response;
	}

	async getNeedPath(id: number): Promise<NeedModel[]> {
		if (id === 1) {
			return [];
		}
		const need = await this.getOneNeed(id);
		if (!need.parent) {
			throw new NotFoundException('!الحاجة غير موجودة');
		}
		const needPath = await this.getNeedPath(need.parent.id);
		needPath.push(need);
		return needPath;
	}

	async getChildNeedLog(query: GetChildNeedLogDto, accountId: number): Promise<PaginationModel<ChildNeedLogModel>> {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: accountId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود في النظام');
		}

		const { take, skip } = getPagination(query.page, query.limit);

		const [childNeeds, total] = await this.childNeedLogRepo.findAndCount({
			skip,
			take,
			where: {
				child: {
					id: child.id
				},
				status: query.status ? query.status === 'true' : undefined
			},
			relations: ['need'],
			order: {
				createdAt: 'DESC'
			}
		});

		const response: ChildNeedLogModel[] = await Promise.all(
			childNeeds.map(async (childNeed) => {
				const res: ChildNeedLogModel = {
					id: childNeed.id,
					status: childNeed.status,
					createdAt: childNeed.createdAt,
					needs: await this.getNeedPath(childNeed.need.id)
				};
				return res;
			})
		);

		return {
			data: response,
			count: response.length,
			total: total,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async deleteNeed(id: number) {
		const need = await this.needRepo.findOne({
			where: {
				id: id
			},
			relations: ['children', 'childNeedLog']
		});
		if (!need) {
			throw new NotFoundException('!الحاجة غير موجودة في النظام');
		}

		await Promise.all(
			need.children.map(async (childNeed) => {
				await this.deleteNeed(childNeed.id);
				return childNeed;
			})
		);

		await this.needRepo.softRemove(need);
		return null;
	}

	async addChildNeed(needId: number, account: Account) {
		const need = await this.needRepo.findOne({
			where: {
				id: needId
			}
		});
		if (!need) {
			throw new NotFoundException('!الحاجة غير موجودة في النظام');
		}

		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: account.id
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود في النظام');
		}
		if (child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		return await this.childNeedLogRepo.save(
			this.childNeedLogRepo.create({
				child: {
					id: child.id
				},
				need: {
					id: needId
				},
				status: false
			})
		);
	}

	async updateChildNeedLevel(body: UpdateChildNeedLevelDto, childId: number, account: Account) {
		const childNeedLevel = await this.childNeedLevelRepo.findOne({
			where: {
				child: {
					account: {
						id: childId
					}
				}
			},
			relations: ['createdBy', 'child', 'child.account']
		});

		if (!childNeedLevel) {
			throw new NotFoundException('!الطفل غير موجود في النظام');
		}

		if (childNeedLevel.child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		childNeedLevel.needLevel = body.needLevel;
		childNeedLevel.createdBy.id = account.id;

		await this.childNeedLevelRepo.save(childNeedLevel);
		return childNeedLevel;
	}

	async markNeedOfChildDone(body: MarkNeedOfChildDoneDto, requestOwnerAccount: Account) {
		const childNeed = await this.childNeedLogRepo.findOne({
			where: {
				id: body.id
			},
			relations: ['child', 'child.account']
		});

		if (!childNeed) {
			throw new NotFoundException('!لايوجد طلب حاجة');
		}
		if (!allowedToUse(requestOwnerAccount, childNeed.child.account.id)) {
			throw new UnauthorizedException('!غير مصرح لك بتعديل هذا العنصر');
		}
		if (childNeed.child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		childNeed.status = true;
		await this.childNeedLogRepo.save(childNeed);
		return childNeed;
	}

	async markAllNeedOfChildDone(childId: number, requestOwnerAccount: Account) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			},
			relations: ['account']
		});

		if (!child) {
			throw new NotFoundException('!الحساب غير موجود في النظام');
		}
		if (!allowedToUse(requestOwnerAccount, child.account.id)) {
			throw new UnauthorizedException('!غير مصرح لك بتعديل هذا العنصر');
		}
		if (child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		const childNeed = await this.childNeedLogRepo.find({
			where: {
				child: {
					id: child.id
				}
			}
		});

		if (!childNeed) {
			throw new NotFoundException('!الطفل ليس لديه طلبات حاجة');
		}

		await Promise.all(
			childNeed.map(async (childNeed) => {
				childNeed.status = true;
				await this.childNeedLogRepo.save(childNeed);
				return childNeed;
			})
		);
		return null;
	}

	async addSoundToNeed(body: AddSoundToNeedDto, needId: number) {
		const need = await this.needRepo.findOne({
			where: {
				id: needId
			},
			relations: ['sound']
		});
		if (!need) {
			throw new NotFoundException('!الحاجة غير موجودة في النظام');
		}

		if (need.sound && need.sound.mediaRowId == body.soundId) {
			throw new BadRequestException('!هذاالصوت موجود مسبقا لهذه الحاجة');
		}

		const content = await this.contentRepo.findOne({
			where: {
				id: body.soundId,
				contentType: 'sound'
			}
		});
		if (!content) {
			throw new NotFoundException('!المحتوى غير موجود في النظام');
		}

		await this.dataSource
			.createQueryBuilder()
			.update(Need)
			.set({
				sound: {
					id: content.id
				}
			})
			.where({ id: needId })
			.execute();

		return true;
	}

	getChildNeedLevels() {
		return [
			{
				level: 1
			},
			{
				level: 2
			},
			{
				level: 3
			}
		];
	}
}
