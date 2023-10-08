import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, DataSource, Between, In, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
	Class,
	Child,
	Teacher,
	Account,
	HomeTask,
	ClassChild,
	ClassTeacher,
	HomeTaskModel,
	ChildHomeTask,
	PaginationModel,
	ExternalHomeTask,
	InternalHomeTask,
	HomeTaskTypeModel,
	CreateHomeTaskDto,
	UpdateHomeTaskDto,
	GetManyHomeTaskDto,
	ExternalHomeTaskLog,
	InternalHomeTaskLog,
	GetClassHomeTaskDto,
	InternalHomeTaskModel,
	ExternalHomeTaskModel,
	GetHomeTaskForChildDto,
	InternalHomeTaskLogModel,
	ExternalHomeTaskLogModel,
	GetInternalHomeTaskLogDto,
	GetExternalHomeTaskLogDto,
	CreateExternalHomeTaskLogDto,
	CreateInternalHomeTaskLogDto
} from '@autism/shared/type';
import { getPagination, getRandomInt } from '@autism/shared/util';

@Injectable()
export class HomeTaskService {
	constructor(
		private dataSource: DataSource,
		@InjectRepository(Child)
		private childRepo: Repository<Child>,
		@InjectRepository(Class)
		private classRepo: Repository<Class>,
		@InjectRepository(Teacher)
		private teacherRepo: Repository<Teacher>,
		@InjectRepository(HomeTask)
		private homeTaskRepo: Repository<HomeTask>,
		@InjectRepository(ClassChild)
		private classChildRepo: Repository<ClassChild>,
		@InjectRepository(ClassTeacher)
		private classTeacherRepo: Repository<ClassTeacher>,
		@InjectRepository(ChildHomeTask)
		private childHomeTaskRepo: Repository<ChildHomeTask>,
		@InjectRepository(InternalHomeTask)
		private internalHomeTaskRepo: Repository<InternalHomeTask>,
		@InjectRepository(ExternalHomeTask)
		private externalHomeTaskRepo: Repository<ExternalHomeTask>,
		@InjectRepository(InternalHomeTaskLog)
		private internalHomeTaskLogRepo: Repository<InternalHomeTaskLog>,
		@InjectRepository(ExternalHomeTaskLog)
		private externalHomeTaskLogRepo: Repository<ExternalHomeTaskLog>
	) {}

	async getOneHomeTask(id: number): Promise<HomeTaskModel> {
		const homeTask = await this.homeTaskRepo.findOne({
			where: {
				id: id
			},
			relations: ['teacher', 'externalHomeTask', 'internalHomeTask', 'internalHomeTask.exercise']
		});
		if (!homeTask) {
			throw new NotFoundException('!هذه المهمة غير موجودة في النظام');
		}

		let taskModel: HomeTaskTypeModel | null = null;
		if (homeTask.taskType === 'internal-task') {
			const internalTaskModel: InternalHomeTaskModel = {
				id: homeTask.internalHomeTask.id,
				createdAt: homeTask.internalHomeTask.createdAt,
				exerciseId: homeTask.internalHomeTask.exercise.id
			};

			taskModel = {
				internalHomeTask: internalTaskModel,
				externalHomeTask: null
			};
		} else {
			const externalTaskModel: ExternalHomeTaskModel = {
				id: homeTask.externalHomeTask.id,
				createdAt: homeTask.externalHomeTask.createdAt
			};

			taskModel = {
				internalHomeTask: null,
				externalHomeTask: externalTaskModel
			};
		}

		return {
			task: taskModel,
			id: homeTask.id,
			taskName: homeTask.taskName,
			taskType: homeTask.taskType,
			createdAt: homeTask.createdAt,
			teacherId: homeTask.teacher.id,
			sessionNumber: homeTask.sessionNumber
		};
	}

	async createHomeTask(body: CreateHomeTaskDto, account: Account): Promise<HomeTaskModel> {
		const teacher = await this.teacherRepo.findOne({
			where: {
				account: {
					id: account.id
				}
			}
		});
		if (!teacher) {
			throw new NotFoundException('!المعلم غير موجود');
		}

		const cls = await this.classRepo.findOne({
			where: {
				id: body.classId
			}
		});
		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		if (account.accountType == 'teacher') {
			const classTeacher = await this.classTeacherRepo.findOne({
				where: {
					cls: {
						id: cls.id
					},
					teacher: {
						id: teacher.id
					}
				}
			});
			if (!classTeacher) {
				throw new NotFoundException('!لايمكن لهذا المعلم إضافة مهمة لهذا الصف');
			}
		}
		const classChilds = await this.classChildRepo.find({
			where: {
				cls: {
					id: cls.id
				}
			},
			relations: ['child', 'child.account']
		});
		if (!classChilds) {
			throw new NotFoundException('!لايوجد أطفال بهذا الصف');
		}

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const homeTask = await queryRunner.manager.save(
				this.homeTaskRepo.create({
					sessionNumber: body.sessionNumber,
					taskType: body.taskType,
					taskName: body.taskName,
					teacher: {
						id: teacher.id
					}
				})
			);

			if (body.taskType === 'external-task') {
				const externalHomeTask = await queryRunner.manager.save(
					this.externalHomeTaskRepo.create({
						homeTask: {
							id: homeTask.id
						}
					})
				);

				await Promise.all(
					classChilds.map((child) => {
						if (!child.child.account.isBlocked) {
							return queryRunner.manager.save(
								this.externalHomeTaskLogRepo.create({
									externalHomeTask: {
										id: externalHomeTask.id
									},
									child: child.child
								})
							);
						}
						return null;
					})
				);
			} else {
				await queryRunner.manager.save(
					this.internalHomeTaskRepo.create({
						exercise: {
							id: body.exerciseId
						},
						homeTask: {
							id: homeTask.id
						}
					})
				);
			}

			await Promise.all(
				classChilds.map((child) => {
					if (!child.child.account.isBlocked) {
						return queryRunner.manager.save(
							this.childHomeTaskRepo.create({
								homeTask: homeTask,
								child: child.child
							})
						);
					}
					return null;
				})
			);

			await queryRunner.commitTransaction();

			return await this.getOneHomeTask(homeTask.id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة المهمة, ${error}`);
		}
	}

	async deleteHomeTask(id: number) {
		const homeTask = await this.homeTaskRepo.findOne({
			where: {
				id: id
			},
			relations: [
				'childHomeTask',
				'externalHomeTask',
				'externalHomeTask.externalHomeTaskLog',
				'internalHomeTask',
				'internalHomeTask.internalHomeTaskLog'
			]
		});
		if (!homeTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}
		await this.homeTaskRepo.softRemove(homeTask);
		return null;
	}

	async createExternalHomeTaskLog(body: CreateExternalHomeTaskLogDto, account: Account) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: account.id
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}

		if (child.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		const homeTask = await this.homeTaskRepo.findOne({
			where: {
				id: body.homeTaskId,
				taskType: 'external-task'
			},
			relations: ['externalHomeTask']
		});
		if (!homeTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}

		const externalHomeTaskLog = await this.externalHomeTaskLogRepo.findOne({
			where: {
				child: {
					id: child.id
				},
				externalHomeTask: {
					id: homeTask.externalHomeTask.id
				}
			}
		});
		if (!externalHomeTaskLog) {
			throw new NotFoundException('!سجل المهمة غير موجود');
		}

		Object.assign(externalHomeTaskLog, { childPerformance: body.childPerformance, note: body.note });
		return await this.externalHomeTaskLogRepo.save(externalHomeTaskLog);
	}

	async createInternalHomeTaskLog(body: CreateInternalHomeTaskLogDto, account: Account) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: account.id
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}

		if (child.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		const homeTask = await this.homeTaskRepo.findOne({
			where: {
				id: body.homeTaskId,
				taskType: 'internal-task'
			},
			relations: ['internalHomeTask']
		});
		if (!homeTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}

		return await this.internalHomeTaskLogRepo.save(
			this.internalHomeTaskLogRepo.create({
				child: {
					id: child.id
				},
				internalHomeTask: {
					id: homeTask.internalHomeTask.id
				},
				status: body.status === 'true',
				numOfTry: body.numOfTry,
				time: body.time
			})
		);
	}

	async getInternalHomeTaskLog(
		query: GetInternalHomeTaskLogDto,
		childId: number
	): Promise<PaginationModel<InternalHomeTaskLogModel>> {
		const { take, skip } = getPagination(query.page, query.limit);

		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}

		let notInIds: number[] = [];
		if (query.status === 'false') {
			notInIds = (
				await this.internalHomeTaskLogRepo.find({
					where: {
						status: true,
						child: {
							id: child.id
						}
					},
					relations: ['internalHomeTask'],
					order: {
						createdAt: 'DESC'
					}
				})
			).map((internalHomeTaskLog) => {
				return internalHomeTaskLog.internalHomeTask.id;
			});
		}

		const [homeTasks, total] = await this.homeTaskRepo.findAndCount({
			skip,
			take,
			where: {
				internalHomeTask: {
					id: Not(In(notInIds)),
					internalHomeTaskLog: {
						child: {
							id: child.id
						},
						status: query.status ? query.status === 'true' : undefined
					}
				},
				taskType: 'internal-task'
			},
			relations: ['internalHomeTask', 'internalHomeTask.internalHomeTaskLog']
		});

		const response: InternalHomeTaskLogModel[] = await Promise.all(
			homeTasks.map(async (homeTask) => {
				let totalTime = 0;
				let totalTries = 0;
				let status = false;
				for (let i = 0; i < homeTask.internalHomeTask.internalHomeTaskLog.length; i++) {
					totalTime += homeTask.internalHomeTask.internalHomeTaskLog[i].time;
					totalTries += homeTask.internalHomeTask.internalHomeTaskLog[i].numOfTry;
					status = status || homeTask.internalHomeTask.internalHomeTaskLog[i].status;
				}

				const res: InternalHomeTaskLogModel = {
					homeTask: await this.getOneHomeTask(homeTask.id),
					totalTime: totalTime,
					totalTries: totalTries,
					status: status
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

	async getDetailsInternalHomeTaskLog(taskId: number, childId: number) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}

		const homeTask = await this.homeTaskRepo.findOne({
			where: {
				id: taskId,
				taskType: 'internal-task'
			},
			relations: ['internalHomeTask']
		});
		if (!homeTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}

		return await this.internalHomeTaskLogRepo.find({
			where: {
				child: {
					id: child.id
				},
				internalHomeTask: {
					id: homeTask.internalHomeTask.id
				}
			},
			order: {
				createdAt: 'DESC'
			}
		});
	}

	async updateHomeTask(body: UpdateHomeTaskDto, id: number): Promise<HomeTaskModel> {
		const homeTask = await this.homeTaskRepo.findOne({
			where: {
				id: id
			}
		});
		if (!homeTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}

		Object.assign(homeTask, body);
		await this.homeTaskRepo.save(homeTask);

		return await this.getOneHomeTask(homeTask.id);
	}

	async getExternalHomeTaskLog(query: GetExternalHomeTaskLogDto, childId: number) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}

		const date = new Date(query.date);
		const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

		const externalHomeTaskLogs = await this.externalHomeTaskLogRepo.find({
			where: {
				child: {
					id: child.id
				},
				externalHomeTask: {
					homeTask: {
						createdAt: Between(startDate, endDate),
						taskType: 'external-task'
					}
				}
			},
			relations: ['externalHomeTask', 'externalHomeTask.homeTask']
		});

		return await Promise.all(
			externalHomeTaskLogs.map(async (externalHomeTaskLog) => {
				return {
					id: externalHomeTaskLog.id,
					note: externalHomeTaskLog.note,
					childPerformance: externalHomeTaskLog.childPerformance,
					homeTask: await this.getOneHomeTask(externalHomeTaskLog.externalHomeTask.homeTask.id)
				} as ExternalHomeTaskLogModel;
			})
		);
	}

	async getHomeTaskForChild(query: GetHomeTaskForChildDto, account: Account): Promise<HomeTaskModel | null> {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: account.id
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}

		const childHomeTasks = await this.childHomeTaskRepo.find({
			where: {
				child: {
					id: child.id
				},
				homeTask: {
					taskType: 'internal-task'
				}
			},
			relations: [
				'homeTask',
				'homeTask.internalHomeTask',
				'homeTask.internalHomeTask.exercise',
				'homeTask.internalHomeTask.internalHomeTaskLog'
			]
		});

		const allowedHomeTasks1 = await Promise.all(
			childHomeTasks.filter(
				(childHomeTask) => childHomeTask.homeTask.internalHomeTask.exercise.exerciseType === query.exerciseType
			)
		);

		const allowedHomeTasks2 = await Promise.all(
			allowedHomeTasks1.filter(
				(childHomeTask) =>
					childHomeTask.homeTask.internalHomeTask.internalHomeTaskLog.filter((log) => log.status === true).length === 0
			)
		);

		if (allowedHomeTasks2.length === 0) {
			return null;
		}

		const pickedIdx = getRandomInt(0, allowedHomeTasks2.length - 1);
		return await this.getOneHomeTask(allowedHomeTasks2[pickedIdx].homeTask.id);
	}

	async getClassHomeTask(query: GetClassHomeTaskDto, classId: number): Promise<PaginationModel<HomeTaskModel>> {
		const { skip, take } = getPagination(query.page, query.limit);

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});
		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		const date = new Date(query.date);
		const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

		const [homeTasks, total] = await this.homeTaskRepo.findAndCount({
			skip,
			take,
			where: {
				childHomeTask: {
					child: {
						classChild: {
							cls: {
								id: cls.id
							}
						}
					}
				},
				createdAt: Between(startDate, endDate),
				taskType: query.taskType ? query.taskType : undefined
			}
		});

		const response: HomeTaskModel[] = await Promise.all(
			homeTasks.map(async (homeTask) => {
				return await this.getOneHomeTask(homeTask.id);
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

	async getManyHomeTask(query: GetManyHomeTaskDto): Promise<PaginationModel<HomeTaskModel>> {
		const { skip, take } = getPagination(query.page, query.limit);

		const [centerTasks, total] = await this.homeTaskRepo.findAndCount({
			skip,
			take,
			where: {
				taskType: query.taskType ? query.taskType : undefined
			}
		});

		const response: HomeTaskModel[] = await Promise.all(
			centerTasks.map(async (centerTask) => {
				return await this.getOneHomeTask(centerTask.id);
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
}
