import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Not, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {
	Child,
	Account,
	PaginationModel,
	ChildWaitingTime,
	ChildTimeExercise,
	TimeExerciseLogModel,
	ChildTimeExerciseLog,
	GetTimeExerciseLogDto,
	CreateTimeExerciseLogDto,
	GetChildTimeExercisesDto,
	SetWaitingTimeForChildDto
} from '@autism/shared/type';
import { getPagination } from '@autism/shared/util';
import { ExerciseService } from '@autism/task-management/exercise';

@Injectable()
export class TimeLearningService {
	constructor(
		private exerciseService: ExerciseService,
		@InjectRepository(Child)
		private childRepo: Repository<Child>,
		@InjectRepository(ChildTimeExercise)
		private childTimeExerciseRepo: Repository<ChildTimeExercise>,
		@InjectRepository(ChildTimeExerciseLog)
		private childTimeExerciseLogRepo: Repository<ChildTimeExerciseLog>,
		@InjectRepository(ChildWaitingTime)
		private childWaitingTimeRepo: Repository<ChildWaitingTime>
	) {}

	async createTimeExerciseLog(body: CreateTimeExerciseLogDto, account: Account) {
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
			throw new BadRequestException('!هذا الحساب محظور');
		}

		const timeExercise = await this.childTimeExerciseRepo.findOne({
			where: {
				child: {
					id: child.id
				},
				exercise: {
					id: body.exerciseId
				}
			}
		});
		if (!timeExercise) {
			throw new NotFoundException('!التمرين غير موجود');
		}

		return await this.childTimeExerciseLogRepo.save(
			this.childTimeExerciseLogRepo.create({
				childTimeExercise: {
					id: timeExercise.id
				},
				status: body.status === 'true',
				numOfTry: body.numOfTry,
				time: body.time
			})
		);
	}

	async getTimeExerciseLog(
		query: GetTimeExerciseLogDto,
		childId: number
	): Promise<PaginationModel<TimeExerciseLogModel>> {
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
				await this.childTimeExerciseLogRepo.find({
					where: {
						status: true,
						childTimeExercise: {
							child: {
								id: child.id
							}
						}
					},
					relations: ['childTimeExercise']
				})
			).map((childTimeExerciseLog) => {
				return childTimeExerciseLog.childTimeExercise.id;
			});
		}

		const [timeExercises, total] = await this.childTimeExerciseRepo.findAndCount({
			skip,
			take,
			where: {
				childTimeExerciseLog: {
					id: Not(In(notInIds)),
					status: query.status ? query.status === 'true' : undefined,
					childTimeExercise: {
						child: {
							id: child.id
						}
					}
				}
			},
			relations: ['childTimeExerciseLog', 'exercise']
		});

		const response: TimeExerciseLogModel[] = await Promise.all(
			timeExercises.map(async (timeExercise) => {
				let totalTime = 0;
				let totalTries = 0;
				let status = false;
				for (let i = 0; i < timeExercise.childTimeExerciseLog.length; i++) {
					totalTime += timeExercise.childTimeExerciseLog[i].time;
					totalTries += timeExercise.childTimeExerciseLog[i].numOfTry;
					status = status || timeExercise.childTimeExerciseLog[i].status;
				}

				const res: TimeExerciseLogModel = {
					totalTime: totalTime,
					totalTries: totalTries,
					status: status,
					timeExercise: await this.exerciseService.getOneExercise(timeExercise.exercise.id)
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

	async getDetailsTimeExerciseLog(timeExerciseId: number, childId: number) {
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

		const timeExercise = await this.childTimeExerciseRepo.findOne({
			where: {
				child: {
					id: child.id
				},
				exercise: {
					id: timeExerciseId
				}
			}
		});
		if (!timeExercise) {
			throw new NotFoundException('!التمرين غير موجود');
		}

		return await this.childTimeExerciseLogRepo.find({
			where: {
				childTimeExercise: {
					id: timeExercise.id
				}
			},
			order: {
				createdAt: 'DESC'
			}
		});
	}

	async assignTimeExerciseToChild(timeExerciseId: number, childId: number) {
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

		const exercise = await this.exerciseService.getOneExercise(timeExerciseId);

		const timeExercise = await this.childTimeExerciseRepo.findOne({
			where: {
				child: {
					id: child.id
				},
				exercise: {
					id: exercise.id
				}
			}
		});
		if (timeExercise) {
			throw new NotFoundException('!التمرين مسند لهذا الطفل من قبل');
		}

		return await this.childTimeExerciseRepo.save(
			this.childTimeExerciseRepo.create({
				child: {
					id: child.id
				},
				exercise: {
					id: exercise.id
				}
			})
		);
	}

	async unassignTimeExerciseFromChild(timeExerciseId: number, childId: number) {
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

		const exercise = await this.exerciseService.getOneExercise(timeExerciseId);

		const timeExercise = await this.childTimeExerciseRepo.findOne({
			where: {
				child: {
					id: child.id
				},
				exercise: {
					id: exercise.id
				}
			},
			relations: ['childTimeExerciseLog']
		});
		if (!timeExercise) {
			throw new NotFoundException('!التمرين غير مسند لهذا الطفل من قبل');
		}

		await this.childTimeExerciseRepo.softRemove(timeExercise);
		return null;
	}

	async getChildTimeExercises(query: GetChildTimeExercisesDto, childId: number) {
		const { skip, take } = getPagination(query.page, query.limit);

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

		const notInIds: number[] = (
			await this.childTimeExerciseLogRepo.find({
				where: {
					status: true,
					childTimeExercise: {
						child: {
							id: child.id
						}
					}
				},
				relations: ['childTimeExercise']
			})
		).map((childTimeExerciseLog) => {
			return childTimeExerciseLog.childTimeExercise.id;
		});

		const [timeExercises, total] = await this.childTimeExerciseRepo.findAndCount({
			skip,
			take,
			where: {
				id: Not(In(notInIds)),
				child: {
					id: child.id
				}
			},
			relations: ['exercise'],
			order: {
				createdAt: 'DESC'
			}
		});

		const response = await Promise.all(
			timeExercises.map((timeExercise) => {
				return this.exerciseService.getOneExercise(timeExercise.exercise.id);
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

	async setWaitingTimeForChild(body: SetWaitingTimeForChildDto, childId: number) {
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

		let waitingTime = await this.childWaitingTimeRepo.findOneBy({
			child: {
				id: child.id
			}
		});

		if (waitingTime) {
			waitingTime.deletedAt = null;
			waitingTime.time = body.time;
		} else {
			waitingTime = this.childWaitingTimeRepo.create({
				child: {
					id: child.id
				},
				time: body.time
			});
		}

		return await this.childWaitingTimeRepo.save(waitingTime);
	}

	async getWaitingTimeForChild(childId: number) {
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

		return await this.childWaitingTimeRepo.findOneBy({
			child: {
				id: child.id
			}
		});
	}
}
