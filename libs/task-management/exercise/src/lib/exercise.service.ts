import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import {
	Time,
	Exercise,
	Matching,
	TimeModel,
	NumberOrder,
	MatchingModel,
	ExerciseModel,
	NumberCompare,
	GetExercisesDto,
	PaginationModel,
	NumberOrderModel,
	NumberCompareModel,
	GetOneExerciseModel,
	StatementComposition,
	CreateTimeExerciseDto,
	CreateMatchingExerciseDto,
	StatementCompositionModel,
	CreateNumberOrderExerciseDto,
	CreateNumberCompareExerciseDto,
	CreateStatementCompositionExerciseDto
} from '@autism/shared/type';
import { getPagination, shuffleArray } from '@autism/shared/util';

@Injectable()
export class ExerciseService {
	constructor(
		private dataSource: DataSource,
		@InjectRepository(Time)
		private timeRepo: Repository<Time>,
		@InjectRepository(Matching)
		private matchingRepo: Repository<Matching>,
		@InjectRepository(Exercise)
		private exerciseRepo: Repository<Exercise>,
		@InjectRepository(NumberOrder)
		private numberOrderRepo: Repository<NumberOrder>,
		@InjectRepository(NumberCompare)
		private numberCompareRepo: Repository<NumberCompare>,
		@InjectRepository(StatementComposition)
		private statementCompositionRepo: Repository<StatementComposition>
	) {}

	async readNumberOrderExercise(id: number): Promise<ExerciseModel> {
		const numberOrder = await this.numberOrderRepo.findOne({
			where: {
				id: id
			}
		});
		if (!numberOrder) {
			throw new NotFoundException('!التمرين غير موجود');
		}

		const numbers = JSON.parse(numberOrder.numbers) as number[];
		const answer = [...numbers];
		answer.sort(function (n1, n2) {
			return n1 - n2;
		});

		const exercise: NumberOrderModel = {
			createdAt: numberOrder.createdAt,
			id: numberOrder.id,
			numbers: numbers,
			answer: answer
		};

		return {
			numberOrder: exercise,
			numberCompare: null,
			matching: null,
			statementComposition: null,
			time: null
		};
	}

	async readNumberCompareExercise(id: number): Promise<ExerciseModel> {
		const numberCompare = await this.numberCompareRepo.findOne({
			where: {
				id: id
			}
		});
		if (!numberCompare) {
			throw new NotFoundException('!التمرين غير موجود');
		}

		const exercise: NumberCompareModel = {
			id: numberCompare.id,
			number1: numberCompare.number1,
			number2: numberCompare.number2,
			createdAt: numberCompare.createdAt,
			answer:
				numberCompare.number1 > numberCompare.number2 ? '>' : numberCompare.number1 < numberCompare.number2 ? '<' : '='
		};

		return {
			numberOrder: null,
			numberCompare: exercise,
			matching: null,
			statementComposition: null,
			time: null
		};
	}

	async readStatementCompositionExercise(id: number): Promise<ExerciseModel> {
		const statementComposition = await this.statementCompositionRepo.findOne({
			where: {
				id: id
			}
		});
		if (!statementComposition) {
			throw new NotFoundException('!التمرين غير موجود');
		}

		const answer = statementComposition.statement.split(' ');
		const statement = shuffleArray(statementComposition.statement.split(' ')) as string[];

		const exercise: StatementCompositionModel = {
			id: statementComposition.id,
			statement: statement,
			answer: answer,
			createdAt: statementComposition.createdAt
		};

		return {
			numberOrder: null,
			numberCompare: null,
			matching: null,
			statementComposition: exercise,
			time: null
		};
	}

	async readTimeExercise(id: number): Promise<ExerciseModel> {
		const time = await this.timeRepo.findOne({
			where: {
				id: id
			}
		});
		if (!time) {
			throw new NotFoundException('!التمرين غير موجود');
		}

		const arr = shuffleArray([
			{
				time: time.time1,
				status: true
			},
			{
				time: time.time2,
				status: false
			},
			{
				time: time.time3,
				status: false
			}
		]) as { time: string; status: boolean }[];

		const exercise: TimeModel = {
			id: time.id,
			mainTime: time.mainTime,
			time1: arr[0].time,
			time2: arr[1].time,
			time3: arr[2].time,
			answer: arr[0].status ? 1 : arr[1].status ? 2 : 3,
			type: time.type,
			createdAt: time.createdAt
		};

		return {
			numberOrder: null,
			numberCompare: null,
			matching: null,
			statementComposition: null,
			time: exercise
		};
	}

	async readMatchingExercise(id: number): Promise<ExerciseModel> {
		const matching = await this.matchingRepo.findOne({
			where: {
				id: id
			},
			relations: ['mainContent', 'content1', 'content2', 'content3']
		});
		if (!matching) {
			throw new NotFoundException('!التمرين غير موجود');
		}

		const arr = shuffleArray([
			{
				id: matching.content1.id,
				status: true
			},
			{
				id: matching.content2.id,
				status: false
			},
			{
				id: matching.content3.id,
				status: false
			}
		]) as { id: number; status: boolean }[];

		const exercise: MatchingModel = {
			id: matching.id,
			mainContentId: matching.mainContent.id,
			content1Id: arr[0].id,
			content2Id: arr[1].id,
			content3Id: arr[2].id,
			answer: arr[0].status ? 1 : arr[1].status ? 2 : 3,
			createdAt: matching.createdAt
		};

		return {
			numberOrder: null,
			numberCompare: null,
			matching: exercise,
			statementComposition: null,
			time: null
		};
	}

	async getExercises(query: GetExercisesDto): Promise<PaginationModel<GetOneExerciseModel>> {
		const { take, skip } = getPagination(query.page, query.limit);

		const [exercises, total] = await this.exerciseRepo.findAndCount({
			skip,
			take,
			where: {
				exerciseType: query.type ? query.type : undefined
			},
			order: {
				createdAt: 'DESC'
			}
		});

		const response: GetOneExerciseModel[] = await Promise.all(
			exercises.map(async (exercise) => {
				return this.getOneExercise(exercise.id);
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

	async getOneExercise(id: number): Promise<GetOneExerciseModel> {
		const exercise = await this.exerciseRepo.findOne({
			where: {
				id: id
			}
		});
		if (!exercise) {
			throw new NotFoundException('!هذا التمرين غير موجود في النظام');
		}

		let exerciseModel: ExerciseModel | null = null;
		if (exercise.exerciseType === 'number-order') {
			exerciseModel = await this.readNumberOrderExercise(exercise.exerciseRowId);
		} else if (exercise.exerciseType === 'number-compare') {
			exerciseModel = await this.readNumberCompareExercise(exercise.exerciseRowId);
		} else if (exercise.exerciseType === 'statement-composition') {
			exerciseModel = await this.readStatementCompositionExercise(exercise.exerciseRowId);
		} else if (exercise.exerciseType === 'matching') {
			exerciseModel = await this.readMatchingExercise(exercise.exerciseRowId);
		} else {
			exerciseModel = await this.readTimeExercise(exercise.exerciseRowId);
		}

		return {
			id: exercise.id,
			exercise: exerciseModel,
			createdAt: exercise.createdAt,
			exerciseType: exercise.exerciseType
		};
	}

	async createNumberOrderExercise(body: CreateNumberOrderExerciseDto) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const numberOrder = await queryRunner.manager.save(
				this.numberOrderRepo.create({
					numbers: JSON.stringify(body.numbers)
				})
			);

			const exercise = await queryRunner.manager.save(
				this.exerciseRepo.create({
					exerciseRowId: numberOrder.id,
					exerciseType: 'number-order'
				})
			);

			await queryRunner.commitTransaction();
			return await this.getOneExercise(exercise.id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة التمرين, ${error}`);
		}
	}

	async createStatementCompositionExercise(body: CreateStatementCompositionExerciseDto) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const statementComposition = await queryRunner.manager.save(
				this.statementCompositionRepo.create({
					statement: body.statement
				})
			);

			const exercise = await queryRunner.manager.save(
				this.exerciseRepo.create({
					exerciseRowId: statementComposition.id,
					exerciseType: 'statement-composition'
				})
			);

			await queryRunner.commitTransaction();
			return await this.getOneExercise(exercise.id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة التمرين, ${error}`);
		}
	}

	async createNumberCompareExercise(body: CreateNumberCompareExerciseDto) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const numberCompare = await queryRunner.manager.save(
				this.numberCompareRepo.create({
					number1: body.number1,
					number2: body.number2
				})
			);

			const exercise = await queryRunner.manager.save(
				this.exerciseRepo.create({
					exerciseRowId: numberCompare.id,
					exerciseType: 'number-compare'
				})
			);

			await queryRunner.commitTransaction();
			return await this.getOneExercise(exercise.id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة التمرين, ${error}`);
		}
	}

	async createMatchingExercise(body: CreateMatchingExerciseDto) {
		if (
			body.content2Id === body.content1Id ||
			body.content3Id === body.content1Id ||
			body.content2Id === body.mainContentId ||
			body.content3Id === body.mainContentId
		) {
			throw new BadRequestException('!أحد الخيارات يطابق الخيار الصحيح أو الخيار الأصلي في السؤال');
		}

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const matching = await queryRunner.manager.save(
				this.matchingRepo.create({
					mainContent: { id: body.mainContentId },
					content1: { id: body.content1Id },
					content2: { id: body.content2Id },
					content3: { id: body.content3Id },
					answer: 1
				})
			);

			const exercise = await queryRunner.manager.save(
				this.exerciseRepo.create({
					exerciseRowId: matching.id,
					exerciseType: 'matching'
				})
			);

			await queryRunner.commitTransaction();
			return await this.getOneExercise(exercise.id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة التمرين, ${error}`);
		}
	}

	async createTimeExercise(body: CreateTimeExerciseDto) {
		if (body.time2 === body.mainTime || body.time3 === body.mainTime) {
			throw new BadRequestException('!أحد الخيارات يطابق الوقت الأصلي');
		}

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const time = await queryRunner.manager.save(
				this.timeRepo.create({
					mainTime: body.mainTime,
					time1: body.mainTime,
					time2: body.time2,
					time3: body.time3,
					type: body.type,
					answer: 1
				})
			);
			const exercise = await queryRunner.manager.save(
				this.exerciseRepo.create({
					exerciseRowId: time.id,
					exerciseType: 'time'
				})
			);

			await queryRunner.commitTransaction();
			return await this.getOneExercise(exercise.id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة التمرين, ${error}`);
		}
	}

	async deleteExercise(id: number) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const exercise = await this.exerciseRepo.findOne({
				where: {
					id: id
				},
				relations: [
					'internalHomeTask',
					'internalHomeTask.internalHomeTaskLog',
					'internalCenterTask',
					'internalCenterTask.internalCenterTaskLog',
					'childTimeExercise',
					'childTimeExercise.childTimeExerciseLog'
				]
			});
			if (!exercise) {
				throw new NotFoundException('!التمرين غير موجود');
			}

			if (exercise.exerciseType === 'matching') {
				const matching = await this.matchingRepo.findOneBy({
					id: exercise.exerciseRowId
				});
				if (!matching) {
					throw new NotFoundException('!التمرين غير موجود');
				}
				await queryRunner.manager.softRemove(matching);
			} else if (exercise.exerciseType === 'number-order') {
				const numberOrder = await this.numberOrderRepo.findOneBy({
					id: exercise.exerciseRowId
				});
				if (!numberOrder) {
					throw new NotFoundException('!التمرين غير موجود');
				}
				await queryRunner.manager.softRemove(numberOrder);
			} else if (exercise.exerciseType === 'number-compare') {
				const numberCompare = await this.numberCompareRepo.findOneBy({
					id: exercise.exerciseRowId
				});
				if (!numberCompare) {
					throw new NotFoundException('!التمرين غير موجود');
				}
				await queryRunner.manager.softRemove(numberCompare);
			} else if (exercise.exerciseType === 'statement-composition') {
				const statementComposition = await this.statementCompositionRepo.findOneBy({
					id: exercise.exerciseRowId
				});
				if (!statementComposition) {
					throw new NotFoundException('!التمرين غير موجود');
				}
				await queryRunner.manager.softRemove(statementComposition);
			} else if (exercise.exerciseType === 'time') {
				const time = await this.timeRepo.findOneBy({
					id: exercise.exerciseRowId
				});
				if (!time) {
					throw new NotFoundException('!التمرين غير موجود');
				}
				await queryRunner.manager.softRemove(time);
			}

			await queryRunner.manager.softRemove(exercise);
			await queryRunner.commitTransaction();
			return null;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم حذف التمرين, ${error}`);
		}
	}
}
