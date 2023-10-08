import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Like, Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
	Word,
	Image,
	Child,
	Program,
	Activity,
	ProgramChild,
	ActivityProgram,
	PaginationModel,
	CreateProgramDto,
	UpdateProgramDto,
	UpdateActivityDto,
	CreateActivityDto,
	GetManyProgramDto,
	GetManyActivityDto,
	GetOneActivityModel,
	GetManyActivityModel,
	GetChildProgramModel,
	GetProgramsOfActivityDto,
	GetActivitiesOfProgramDto,
	CheckActivitiesIntersectionModel
} from '@autism/shared/type';
import { getPagination } from '@autism/shared/util';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class DailyProgrammeService {
	constructor(
		private dataSource: DataSource,
		@InjectRepository(Word) private wordRepo: Repository<Word>,
		@InjectRepository(Image) private imageRepo: Repository<Image>,
		@InjectRepository(Child) private childRepo: Repository<Child>,
		@InjectRepository(Program) private programRepo: Repository<Program>,
		@InjectRepository(Activity) private activityRepo: Repository<Activity>,
		@InjectRepository(ProgramChild) private programChildRepo: Repository<ProgramChild>,
		@InjectRepository(ActivityProgram) private activityProgramRepo: Repository<ActivityProgram>
	) {}

	async getManyActivity(query: GetManyActivityDto): Promise<PaginationModel<GetManyActivityModel>> {
		const { take, skip } = getPagination(query.page, query.limit);

		const [activities, total] = await this.activityRepo.findAndCount({
			skip,
			take,
			where: {
				name: Like(`%${query.word ? query.word : ''}%`),
				duration: query.duration ? query.duration : undefined,
				time: query.time ? query.time : undefined
			},
			relations: ['content'],
			order: {
				time: 'ASC'
			}
		});

		const response: GetManyActivityModel[] = await Promise.all(
			activities.map(async (activity) => {
				const res: GetManyActivityModel = {
					id: activity.id,
					name: activity.name,
					time: activity.time,
					duration: activity.duration,
					createdAt: activity.createdAt
				};

				if (activity.content.contentType === 'image') {
					const image = await this.imageRepo.findOneBy({
						id: activity.content.mediaRowId
					});
					if (!image) {
						throw new NotFoundException('!الصورة غير موجودة في النظام');
					}

					res.content = {
						id: activity.content.id,
						createdAt: activity.content.createdAt,
						contentType: activity.content.contentType,
						media: {
							id: image.id,
							url: image.url,
							word: null
						}
					};
				} else if (activity.content.contentType === 'word') {
					const word = await this.wordRepo.findOneBy({
						id: activity.content.mediaRowId
					});
					if (!word) {
						throw new NotFoundException('!الكلمة غير موجودة في النظام');
					}

					res.content = {
						id: activity.content.id,
						createdAt: activity.content.createdAt,
						contentType: activity.content.contentType,
						media: {
							id: word.id,
							word: word.word,
							url: null
						}
					};
				}

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

	async deleteActivity(activityId: number) {
		const activity = await this.activityRepo.findOne({
			where: {
				id: activityId
			},
			relations: ['activityProgram']
		});

		if (!activity) {
			throw new NotFoundException('!هذا النشاط غير موجود');
		}

		await this.activityRepo.softRemove(activity);
		return null;
	}

	async getManyProgram(query: GetManyProgramDto): Promise<PaginationModel<Program>> {
		const { take, skip } = getPagination(query.page, query.limit);

		const [programs, total] = await this.programRepo.findAndCount({
			skip,
			take,
			where: {
				name: Like(`%${query.word ? query.word : ''}%`)
			},
			order: {
				createdAt: 'DESC'
			}
		});

		return {
			data: programs,
			count: programs.length,
			total: total,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getActivitiesOfProgram(query: GetActivitiesOfProgramDto, programId: number) {
		const { take, skip } = getPagination(query.page, query.limit);

		const program = await this.programRepo.findOne({
			where: {
				id: programId
			}
		});
		if (!program) {
			throw new NotFoundException('!هذا البرنامج غير موجود');
		}

		const [activitiesProgram, total] = await this.activityProgramRepo.findAndCount({
			take,
			skip,
			where: {
				program: {
					id: programId
				},
				activity: {
					name: Like(`%${query.word ? query.word : ''}%`)
				}
			},
			relations: ['activity', 'activity.content'],
			order: {
				activity: {
					time: 'ASC'
				}
			}
		});

		const response: GetManyActivityModel[] = await Promise.all(
			activitiesProgram.map(async (activityProgram) => {
				const res: GetManyActivityModel = {
					id: activityProgram.activity.id,
					name: activityProgram.activity.name,
					time: activityProgram.activity.time,
					duration: activityProgram.activity.duration,
					createdAt: activityProgram.activity.createdAt
				};

				if (activityProgram.activity.content.contentType === 'image') {
					const image = await this.imageRepo.findOneBy({
						id: activityProgram.activity.content.mediaRowId
					});
					if (!image) {
						throw new NotFoundException('!الصورة غير موجودة في النظام');
					}

					res.content = {
						id: activityProgram.activity.content.id,
						createdAt: activityProgram.activity.content.createdAt,
						contentType: activityProgram.activity.content.contentType,
						media: {
							id: image.id,
							url: image.url,
							word: null
						}
					};
				} else if (activityProgram.activity.content.contentType === 'word') {
					const word = await this.wordRepo.findOneBy({
						id: activityProgram.activity.content.mediaRowId
					});
					if (!word) {
						throw new NotFoundException('!الكلمة غير موجودة في النظام');
					}

					res.content = {
						id: activityProgram.activity.content.id,
						createdAt: activityProgram.activity.content.createdAt,
						contentType: activityProgram.activity.content.contentType,
						media: {
							id: word.id,
							word: word.word,
							url: null
						}
					};
				}

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

	async deleteProgram(programId: number) {
		const program = await this.programRepo.findOne({
			where: {
				id: programId
			},
			relations: ['activityProgram', 'programChild']
		});
		if (!program) {
			throw new NotFoundException('!هذا البرنامج غير موجود');
		}

		await this.programRepo.softRemove(program);
		return null;
	}

	async assignProgramToChild(programId: number, childId: number) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}
		if (child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		const program = await this.programRepo.findOne({
			where: {
				id: programId
			}
		});
		if (!program) {
			throw new NotFoundException('!هذا البرنامج غير موجود');
		}

		let programChild = await this.programChildRepo.findOne({
			where: {
				child: {
					id: child.id
				}
			},
			relations: ['program'],
			withDeleted: true
		});

		if (!programChild) {
			programChild = this.programChildRepo.create({
				child: {
					id: child.id
				},
				program: {
					id: program.id
				}
			});
		} else {
			programChild.deletedAt = null;
			programChild.program.id = program.id;
		}

		await this.programChildRepo.save(programChild);
		return null;
	}

	async unAssignProgramToChild(programId: number, childId: number) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}
		if (child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		const program = await this.programRepo.findOne({
			where: {
				id: programId
			}
		});
		if (!program) {
			throw new NotFoundException('!هذا البرنامج غير موجود');
		}

		const programChild = await this.programChildRepo.findOne({
			where: {
				child: {
					id: child.id
				},
				program: {
					id: program.id
				}
			}
		});

		if (!programChild) {
			throw new NotFoundException('!هذا البرنامج غير مسند لهذا الطفل');
		}

		await this.programChildRepo.softRemove(programChild);
		return null;
	}

	async createProgram(body: CreateProgramDto) {
		const activities = await Promise.all(
			body.activities.map(async (activityId) => {
				const activity = await this.activityRepo.findOneBy({
					id: activityId.id
				});
				if (!activity) {
					throw new NotFoundException('!أحد الأنشطة غير موجود');
				}
				return activity;
			})
		);

		if (!this.checkActivitiesIntersection({ activities })) {
			throw new BadRequestException('!يوجد تداخل في أوقات الأنشطة');
		}

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const program = await queryRunner.manager.save(
				this.programRepo.create({
					name: body.name
				})
			);

			await Promise.all(
				body.activities.map(async (activity) => {
					await queryRunner.manager.save(
						this.activityProgramRepo.create({
							activity: {
								id: activity.id
							},
							program: {
								id: program.id
							}
						})
					);
					return activity;
				})
			);

			await queryRunner.commitTransaction();
			return null;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم تعديل البرنامج, ${error}`);
		}
	}

	async createActivity(body: CreateActivityDto) {
		return await this.activityRepo.save(
			this.activityRepo.create({
				name: body.name,
				time: body.time,
				duration: body.duration,
				content: {
					id: body.contentId
				}
			})
		);
	}

	async getChildProgram(childId: number): Promise<GetChildProgramModel> {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			},
			relations: ['programChild', 'programChild.program']
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}
		if (!child.programChild) {
			throw new NotFoundException('!لا يوجد برنامج لهذا الطفل');
		}

		const activities = await this.activityRepo.find({
			where: {
				activityProgram: {
					program: {
						id: child.programChild.program.id
					}
				}
			},
			relations: ['content'],
			order: {
				time: 'ASC'
			}
		});

		const activitiesModel = await Promise.all(
			activities.map(async (activity) => {
				const res: GetManyActivityModel = {
					id: activity.id,
					name: activity.name,
					time: activity.time,
					duration: activity.duration,
					createdAt: activity.createdAt
				};

				if (activity.content.contentType === 'image') {
					const image = await this.imageRepo.findOneBy({
						id: activity.content.mediaRowId
					});
					if (!image) {
						throw new NotFoundException('!الصورة غير موجودة في النظام');
					}

					res.content = {
						id: activity.content.id,
						createdAt: activity.content.createdAt,
						contentType: activity.content.contentType,
						media: {
							id: image.id,
							url: image.url,
							word: null
						}
					};
				} else if (activity.content.contentType === 'word') {
					const word = await this.wordRepo.findOneBy({
						id: activity.content.mediaRowId
					});
					if (!word) {
						throw new NotFoundException('!الكلمة غير موجودة في النظام');
					}

					res.content = {
						id: activity.content.id,
						createdAt: activity.content.createdAt,
						contentType: activity.content.contentType,
						media: {
							id: word.id,
							word: word.word,
							url: null
						}
					};
				}

				return res;
			})
		);

		return {
			activities: activitiesModel,
			id: child.programChild.program.id,
			name: child.programChild.program.name,
			createdAt: child.programChild.program.createdAt,
			updatedAt: child.programChild.program.updatedAt
		};
	}

	checkActivitiesIntersection(body: CheckActivitiesIntersectionModel) {
		body.activities.sort((activity1, activity2) => {
			const [sh1, sm1] = activity1.time.split(':');
			const h1 = parseInt(sh1);
			const m1 = parseInt(sm1);
			const t1 = m1 + h1 * 60;

			const [sh2, sm2] = activity2.time.split(':');
			const h2 = parseInt(sh2);
			const m2 = parseInt(sm2);
			const t2 = m2 + h2 * 60;

			return t1 <= t2 ? -1 : 1;
		});

		for (let i = 0; i < body.activities.length - 1; i++) {
			const [sh1, sm1] = body.activities[i].time.split(':');
			const h1 = parseInt(sh1);
			const m1 = parseInt(sm1);
			const t1 = m1 + h1 * 60;
			const e1 = t1 + body.activities[i].duration;

			const [sh2, sm2] = body.activities[i + 1].time.split(':');
			const h2 = parseInt(sh2);
			const m2 = parseInt(sm2);
			const t2 = m2 + h2 * 60;

			if (e1 > t2) {
				return false;
			}
		}
		return true;
	}

	async updateProgram(body: UpdateProgramDto, programId: number) {
		const program = await this.programRepo.findOne({
			where: {
				id: programId
			}
		});
		if (!program) {
			throw new NotFoundException('!هذا البرنامج غير موجود');
		}

		const activityProgram = await this.activityProgramRepo.find({
			where: {
				program: {
					id: programId
				}
			}
		});

		const activities = await Promise.all(
			body.activities.map(async (activityId) => {
				const activity = await this.activityRepo.findOneBy({
					id: activityId.id
				});
				if (!activity) {
					throw new NotFoundException('!أحد الأنشطة غير موجود');
				}
				return activity;
			})
		);

		if (!this.checkActivitiesIntersection({ activities })) {
			throw new BadRequestException('!يوجد تداخل في أوقات الأنشطة');
		}

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.softRemove(activityProgram);

			if (body.name) {
				program.name = body.name;
				await queryRunner.manager.save(program);
			}

			await Promise.all(
				body.activities.map(async (activity) => {
					await queryRunner.manager.save(
						this.activityProgramRepo.create({
							activity: {
								id: activity.id
							},
							program: {
								id: program.id
							}
						})
					);
					return activity;
				})
			);

			await queryRunner.commitTransaction();
			return null;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم تعديل البرنامج, ${error}`);
		}
	}

	async updateActivity(body: UpdateActivityDto, activityId: number) {
		const activity = await this.activityRepo.findOne({
			where: {
				id: activityId
			}
		});

		if (!activity) {
			throw new NotFoundException('!هذا النشاط غير موجود');
		}

		Object.assign(activity, body);

		await this.activityRepo.save(activity);
		return null;
	}

	async getProgramsOfActivity(query: GetProgramsOfActivityDto, activityId: number) {
		const { take, skip } = getPagination(query.page, query.limit);

		const activity = await this.activityRepo.findOne({
			where: {
				id: activityId
			}
		});

		if (!activity) {
			throw new NotFoundException('!هذا النشاط غير موجود');
		}

		const [programs, total] = await this.programRepo.findAndCount({
			take,
			skip,
			where: {
				activityProgram: {
					activity: {
						id: activityId
					}
				},
				name: Like(`%${query.word ? query.word : ''}%`)
			}
		});

		return {
			data: programs,
			count: programs.length,
			total: total,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getOneActivity(activityId: number) {
		const activity = await this.activityRepo.findOne({
			where: {
				id: activityId
			},
			relations: ['content']
		});
		if (!activity) {
			throw new NotFoundException('!هذا النشاط غير موجود');
		}

		const res: GetOneActivityModel = {
			id: activity.id,
			name: activity.name,
			time: activity.time,
			duration: activity.duration,
			createdAt: activity.createdAt
		};

		if (activity.content.contentType === 'image') {
			const image = await this.imageRepo.findOneBy({
				id: activity.content.mediaRowId
			});
			if (!image) {
				throw new NotFoundException('!الصورة غير موجودة في النظام');
			}

			res.content = {
				id: activity.content.id,
				createdAt: activity.content.createdAt,
				contentType: activity.content.contentType,
				media: {
					id: image.id,
					url: image.url,
					word: null
				}
			};
		} else if (activity.content.contentType === 'word') {
			const word = await this.wordRepo.findOneBy({
				id: activity.content.mediaRowId
			});
			if (!word) {
				throw new NotFoundException('!الكلمة غير موجودة في النظام');
			}

			res.content = {
				id: activity.content.id,
				createdAt: activity.content.createdAt,
				contentType: activity.content.contentType,
				media: {
					id: word.id,
					word: word.word,
					url: null
				}
			};
		}
		return res;
	}

	async getProgram(programId: number) {
		const program = await this.programRepo.findOne({
			where: {
				id: programId
			}
		});
		if (!program) {
			throw new NotFoundException('!هذا البرنامج غير موجود');
		}

		return await this.programRepo.findOne({
			where: {
				id: programId
			}
		});
	}
}
