import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository, DataSource, Between, In, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
	Class,
	Child,
	Teacher,
	Account,
	CenterTask,
	ClassChild,
	ClassTeacher,
	PaginationModel,
	CenterTaskModel,
	ChildCenterTask,
	ExternalCenterTask,
	InternalCenterTask,
	CenterTaskTypeModel,
	CreateCenterTaskDto,
	UpdateCenterTaskDto,
	GetManyCenterTaskDto,
	ExternalCenterTaskLog,
	InternalCenterTaskLog,
	GetClassCenterTaskDto,
	InternalCenterTaskModel,
	ExternalCenterTaskModel,
	GetCenterTaskForChildDto,
	InternalCenterTaskLogModel,
	ExternalCenterTaskLogModel,
	GetInternalCenterTaskLogDto,
	GetExternalCenterTaskLogDto,
	CreateExternalCenterTaskLogDto,
	CreateInternalCenterTaskLogDto
} from '@autism/shared/type';
import { getPagination, getRandomInt } from '@autism/shared/util';

@Injectable()
export class CenterTaskService {
	constructor(
		private dataSource: DataSource,
		@InjectRepository(Child)
		private childRepo: Repository<Child>,
		@InjectRepository(Class)
		private classRepo: Repository<Class>,
		@InjectRepository(Teacher)
		private teacherRepo: Repository<Teacher>,
		@InjectRepository(CenterTask)
		private centerTaskRepo: Repository<CenterTask>,
		@InjectRepository(ClassChild)
		private classChildRepo: Repository<ClassChild>,
		@InjectRepository(ClassTeacher)
		private classTeacherRepo: Repository<ClassTeacher>,
		@InjectRepository(ChildCenterTask)
		private childCenterTaskRepo: Repository<ChildCenterTask>,
		@InjectRepository(InternalCenterTask)
		private internalCenterTaskRepo: Repository<InternalCenterTask>,
		@InjectRepository(ExternalCenterTask)
		private externalCenterTaskRepo: Repository<ExternalCenterTask>,
		@InjectRepository(InternalCenterTaskLog)
		private internalCenterTaskLogRepo: Repository<InternalCenterTaskLog>,
		@InjectRepository(ExternalCenterTaskLog)
		private externalCenterTaskLogRepo: Repository<ExternalCenterTaskLog>
	) {}

	async getOneCenterTask(id: number): Promise<CenterTaskModel> {
		const centerTask = await this.centerTaskRepo.findOne({
			where: {
				id: id
			},
			relations: ['teacher', 'externalCenterTask', 'internalCenterTask', 'internalCenterTask.exercise']
		});
		if (!centerTask) {
			throw new NotFoundException('!هذه المهمة غير موجودة في النظام');
		}

		let taskModel: CenterTaskTypeModel | null = null;
		if (centerTask.taskType === 'internal-task') {
			const internalTaskModel: InternalCenterTaskModel = {
				id: centerTask.internalCenterTask.id,
				createdAt: centerTask.internalCenterTask.createdAt,
				exerciseId: centerTask.internalCenterTask.exercise.id
			};

			taskModel = {
				internalCenterTask: internalTaskModel,
				externalCenterTask: null
			};
		} else {
			const externalTaskModel: ExternalCenterTaskModel = {
				id: centerTask.externalCenterTask.id,
				createdAt: centerTask.externalCenterTask.createdAt
			};

			taskModel = {
				internalCenterTask: null,
				externalCenterTask: externalTaskModel
			};
		}

		return {
			task: taskModel,
			id: centerTask.id,
			taskName: centerTask.taskName,
			taskType: centerTask.taskType,
			createdAt: centerTask.createdAt,
			teacherId: centerTask.teacher.id,
			sessionNumber: centerTask.sessionNumber
		};
	}

	async createCenterTask(body: CreateCenterTaskDto, account: Account): Promise<CenterTaskModel> {
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
			const centerTask = await queryRunner.manager.save(
				this.centerTaskRepo.create({
					sessionNumber: body.sessionNumber,
					taskType: body.taskType,
					taskName: body.taskName,
					teacher: {
						id: teacher.id
					}
				})
			);

			if (body.taskType === 'external-task') {
				const externalCenterTask = await queryRunner.manager.save(
					this.externalCenterTaskRepo.create({
						centerTask: {
							id: centerTask.id
						}
					})
				);

				await Promise.all(
					classChilds.map((child) => {
						if (!child.child.account.isBlocked) {
							return queryRunner.manager.save(
								this.externalCenterTaskLogRepo.create({
									externalCenterTask: {
										id: externalCenterTask.id
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
					this.internalCenterTaskRepo.create({
						exercise: {
							id: body.exerciseId
						},
						centerTask: {
							id: centerTask.id
						}
					})
				);
			}

			await Promise.all(
				classChilds.map((child) => {
					if (!child.child.account.isBlocked) {
						return queryRunner.manager.save(
							this.childCenterTaskRepo.create({
								centerTask: centerTask,
								child: child.child
							})
						);
					}
					return null;
				})
			);

			await queryRunner.commitTransaction();

			return await this.getOneCenterTask(centerTask.id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة المهمة, ${error}`);
		}
	}

	async deleteCenterTask(id: number) {
		const centerTask = await this.centerTaskRepo.findOne({
			where: {
				id: id
			},
			relations: [
				'childCenterTask',
				'externalCenterTask',
				'externalCenterTask.externalCenterTaskLog',
				'internalCenterTask',
				'internalCenterTask.internalCenterTaskLog'
			]
		});
		if (!centerTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}
		await this.centerTaskRepo.softRemove(centerTask);
		return null;
	}

	async createExternalCenterTaskLog(body: CreateExternalCenterTaskLogDto, childId: number) {
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
			throw new NotFoundException('!هذا الحساب محظور');
		}

		const centerTask = await this.centerTaskRepo.findOne({
			where: {
				id: body.centerTaskId,
				taskType: 'external-task'
			},
			relations: ['externalCenterTask']
		});
		if (!centerTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}

		const externalCenterTaskLog = await this.externalCenterTaskLogRepo.findOne({
			where: {
				child: {
					id: child.id
				},
				externalCenterTask: {
					id: centerTask.externalCenterTask.id
				}
			}
		});
		if (!externalCenterTaskLog) {
			throw new NotFoundException('!سجل المهمة غير موجود');
		}

		Object.assign(externalCenterTaskLog, { childPerformance: body.childPerformance, note: body.note });
		return await this.externalCenterTaskLogRepo.save(externalCenterTaskLog);
	}

	async createInternalCenterTaskLog(body: CreateInternalCenterTaskLogDto, account: Account) {
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

		const centerTask = await this.centerTaskRepo.findOne({
			where: {
				id: body.centerTaskId,
				taskType: 'internal-task'
			},
			relations: ['internalCenterTask']
		});
		if (!centerTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}

		return await this.internalCenterTaskLogRepo.save(
			this.internalCenterTaskLogRepo.create({
				child: {
					id: child.id
				},
				internalCenterTask: {
					id: centerTask.internalCenterTask.id
				},
				status: body.status === 'true',
				numOfTry: body.numOfTry,
				time: body.time
			})
		);
	}

	async getInternalCenterTaskLog(
		query: GetInternalCenterTaskLogDto,
		childId: number
	): Promise<PaginationModel<InternalCenterTaskLogModel>> {
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
				await this.internalCenterTaskLogRepo.find({
					where: {
						status: true,
						child: {
							id: child.id
						}
					},
					relations: ['internalCenterTask'],
					order: {
						createdAt: 'DESC'
					}
				})
			).map((internalCenterTaskLog) => {
				return internalCenterTaskLog.internalCenterTask.id;
			});
		}

		const [centerTasks, total] = await this.centerTaskRepo.findAndCount({
			skip,
			take,
			where: {
				internalCenterTask: {
					id: Not(In(notInIds)),
					internalCenterTaskLog: {
						child: {
							id: child.id
						},
						status: query.status ? query.status === 'true' : undefined
					}
				},
				taskType: 'internal-task'
			},
			relations: ['internalCenterTask', 'internalCenterTask.internalCenterTaskLog']
		});

		const response: InternalCenterTaskLogModel[] = await Promise.all(
			centerTasks.map(async (centerTask) => {
				let totalTime = 0;
				let totalTries = 0;
				let status = false;
				for (let i = 0; i < centerTask.internalCenterTask.internalCenterTaskLog.length; i++) {
					totalTime += centerTask.internalCenterTask.internalCenterTaskLog[i].time;
					totalTries += centerTask.internalCenterTask.internalCenterTaskLog[i].numOfTry;
					status = status || centerTask.internalCenterTask.internalCenterTaskLog[i].status;
				}

				const res: InternalCenterTaskLogModel = {
					centerTask: await this.getOneCenterTask(centerTask.id),
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

	async getDetailsInternalCenterTaskLog(taskId: number, childId: number) {
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

		const centerTask = await this.centerTaskRepo.findOne({
			where: {
				id: taskId,
				taskType: 'internal-task'
			},
			relations: ['internalCenterTask']
		});
		if (!centerTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}

		return await this.internalCenterTaskLogRepo.find({
			where: {
				child: {
					id: child.id
				},
				internalCenterTask: {
					id: centerTask.internalCenterTask.id
				}
			},
			order: {
				createdAt: 'DESC'
			}
		});
	}

	async updateCenterTask(body: UpdateCenterTaskDto, id: number): Promise<CenterTaskModel> {
		const centerTask = await this.centerTaskRepo.findOne({
			where: {
				id: id
			}
		});
		if (!centerTask) {
			throw new NotFoundException('!المهمة غير موجودة');
		}

		Object.assign(centerTask, body);
		await this.centerTaskRepo.save(centerTask);

		return await this.getOneCenterTask(centerTask.id);
	}

	async getExternalCenterTaskLog(query: GetExternalCenterTaskLogDto, childId: number) {
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

		const externalCenterTaskLogs = await this.externalCenterTaskLogRepo.find({
			where: {
				child: {
					id: child.id
				},
				externalCenterTask: {
					centerTask: {
						createdAt: Between(startDate, endDate),
						taskType: 'external-task'
					}
				}
			},
			relations: ['externalCenterTask', 'externalCenterTask.centerTask']
		});

		return await Promise.all(
			externalCenterTaskLogs.map(async (externalCenterTaskLog) => {
				return {
					id: externalCenterTaskLog.id,
					note: externalCenterTaskLog.note,
					childPerformance: externalCenterTaskLog.childPerformance,
					centerTask: await this.getOneCenterTask(externalCenterTaskLog.externalCenterTask.centerTask.id)
				} as ExternalCenterTaskLogModel;
			})
		);
	}

	async getCenterTaskForChild(query: GetCenterTaskForChildDto, account: Account): Promise<CenterTaskModel | null> {
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

		const childCenterTasks = await this.childCenterTaskRepo.find({
			where: {
				child: {
					id: child.id
				},
				centerTask: {
					taskType: 'internal-task'
				}
			},
			relations: [
				'centerTask',
				'centerTask.internalCenterTask',
				'centerTask.internalCenterTask.exercise',
				'centerTask.internalCenterTask.internalCenterTaskLog'
			]
		});

		const allowedCenterTasks1 = await Promise.all(
			childCenterTasks.filter(
				(childCenterTask) => childCenterTask.centerTask.internalCenterTask.exercise.exerciseType === query.exerciseType
			)
		);

		const allowedCenterTasks2 = await Promise.all(
			allowedCenterTasks1.filter(
				(childCenterTask) =>
					childCenterTask.centerTask.internalCenterTask.internalCenterTaskLog.filter((log) => log.status === true)
						.length === 0
			)
		);

		if (allowedCenterTasks2.length === 0) {
			return null;
		}

		const pickedIdx = getRandomInt(0, allowedCenterTasks2.length - 1);
		return await this.getOneCenterTask(allowedCenterTasks2[pickedIdx].centerTask.id);
	}

	async getClassCenterTask(query: GetClassCenterTaskDto, classId: number): Promise<PaginationModel<CenterTaskModel>> {
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

		const [centerTasks, total] = await this.centerTaskRepo.findAndCount({
			skip,
			take,
			where: {
				childCenterTask: {
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

		const response: CenterTaskModel[] = await Promise.all(
			centerTasks.map(async (centerTask) => {
				return await this.getOneCenterTask(centerTask.id);
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

	async getManyCenterTask(query: GetManyCenterTaskDto): Promise<PaginationModel<CenterTaskModel>> {
		const { skip, take } = getPagination(query.page, query.limit);

		const [centerTasks, total] = await this.centerTaskRepo.findAndCount({
			skip,
			take,
			where: {
				taskType: query.taskType ? query.taskType : undefined
			}
		});

		const response: CenterTaskModel[] = await Promise.all(
			centerTasks.map(async (centerTask) => {
				return await this.getOneCenterTask(centerTask.id);
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
