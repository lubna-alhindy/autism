import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import {
	Goal,
	Plan,
	Child,
	Pep3Test,
	Pep3Question,
	UpdatePlanDto,
	GetChildPlansDto,
	EvaluatePlanGoalDto,
	GeneratePep3TestPlanDto,
	GetPlanProgressiveReportDto
} from '@autism/shared/type';
import { getPagination } from '@autism/shared/util';
import { Pep3TestService } from '@autism/pep3-management/pep3-test';

@Injectable()
export class PlanService {
	constructor(
		private dataSource: DataSource,
		private pep3TestService: Pep3TestService,
		@InjectRepository(Plan) private planRepo: Repository<Plan>,
		@InjectRepository(Goal) private goalRepo: Repository<Goal>,
		@InjectRepository(Child) private childRepo: Repository<Child>,
		@InjectRepository(Pep3Test) private pep3TestRepo: Repository<Pep3Test>,
		@InjectRepository(Pep3Question) private pep3QuestionRepo: Repository<Pep3Question>
	) {}

	async generateGoalsOfPlan(pep3TestId: number) {
		const domainIds = [1, 2, 3, 4, 5, 6, 11];

		const cntQuestions = await Promise.all([
			this.pep3QuestionRepo.countBy({ pep3Domain: { id: domainIds[0] } }),
			this.pep3QuestionRepo.countBy({ pep3Domain: { id: domainIds[1] } }),
			this.pep3QuestionRepo.countBy({ pep3Domain: { id: domainIds[2] } }),
			this.pep3QuestionRepo.countBy({ pep3Domain: { id: domainIds[3] } }),
			this.pep3QuestionRepo.countBy({ pep3Domain: { id: domainIds[4] } }),
			this.pep3QuestionRepo.countBy({ pep3Domain: { id: domainIds[5] } }),
			this.pep3QuestionRepo.countBy({ pep3Domain: { id: domainIds[6] } })
		]);

		const answers = await Promise.all([
			this.pep3TestService.getAnswersOfDomain(pep3TestId, domainIds[0]),
			this.pep3TestService.getAnswersOfDomain(pep3TestId, domainIds[1]),
			this.pep3TestService.getAnswersOfDomain(pep3TestId, domainIds[2]),
			this.pep3TestService.getAnswersOfDomain(pep3TestId, domainIds[3]),
			this.pep3TestService.getAnswersOfDomain(pep3TestId, domainIds[4]),
			this.pep3TestService.getAnswersOfDomain(pep3TestId, domainIds[5]),
			this.pep3TestService.getAnswersOfDomain(pep3TestId, domainIds[6])
		]);

		for (let i = 0; i < 7; i++) {
			if (answers[i].length !== cntQuestions[i]) {
				throw new BadRequestException('!الاختبار غير مكتمل');
			}
		}

		const response: (null | Pep3Question)[] = [null, null, null, null, null, null, null];
		for (let i = 0; i < 7; i++) {
			for (let j = 0; j < cntQuestions[i]; j++) {
				if (answers[i][j].evaluation === 'partially realized') {
					const goal = await this.goalRepo.findOne({
						where: {
							pep3Question: {
								id: answers[i][j].pep3Question.id
							},
							plan: {
								pep3Test: {
									id: pep3TestId
								}
							},
							evaluation: 'realized'
						},
						withDeleted: true
					});

					if (!goal) {
						response[i] = answers[i][j].pep3Question;
						break;
					}
				}
			}
			if (response[i] === null) {
				for (let j = 0; j < cntQuestions[i]; j++) {
					if (answers[i][j].evaluation === 'unrealized') {
						const goal = await this.goalRepo.findOne({
							where: {
								pep3Question: {
									id: answers[i][j].pep3Question.id
								},
								plan: {
									pep3Test: {
										id: pep3TestId
									}
								}
							},
							withDeleted: true
						});

						if (!goal) {
							response[i] = answers[i][j].pep3Question;
							break;
						}
					}
				}
			}
		}

		return response;
	}

	async generatePep3TestPlan(body: GeneratePep3TestPlanDto) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: body.childId
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الحساب غير موجود');
		}
		if (child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		const pep3Test = await this.pep3TestRepo.findOneBy({
			id: body.pep3TestId
		});
		if (!pep3Test) {
			throw new NotFoundException('!الاختبار غير موجود');
		}

		const pep3TestPlan = await this.planRepo.findOneBy({
			pep3Test: {
				id: pep3Test.id
			}
		});
		if (pep3TestPlan) {
			throw new BadRequestException('!يوجد خطة سابقة لهذا الاختبار');
		}

		const goals = await this.generateGoalsOfPlan(pep3Test.id);
		const cnt = await this.planRepo.count({
			where: {
				child: {
					id: child.id
				}
			},
			withDeleted: true
		});

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const plan = await queryRunner.manager.save(
				this.planRepo.create({
					child: {
						id: child.id
					},
					pep3Test: {
						id: pep3Test.id
					},
					name: `الخطة #${cnt + 1}`
				})
			);

			await Promise.all(
				goals.map(async (goal) => {
					if (goal !== null) {
						return await queryRunner.manager.save(
							this.goalRepo.create({
								technique: 'optical',
								plan: {
									id: plan.id
								},
								pep3Question: {
									id: goal.id
								}
							})
						);
					}
					return null;
				})
			);

			await queryRunner.commitTransaction();
			return await this.getOnePlan(plan.id);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم اضافة خطة, ${error}`);
		}
	}

	async getPep3TestPlan(pep3TestId: number) {
		const pep3Test = await this.pep3TestRepo.findOne({
			where: {
				id: pep3TestId
			},
			relations: ['plan']
		});
		if (!pep3Test) {
			throw new NotFoundException('!الاختبار غير موجود');
		}
		if (!pep3Test.plan) {
			throw new NotFoundException('!لا يوجد خطة لهذا الاختبار');
		}

		return await this.getOnePlan(pep3Test.plan.id);
	}

	async getChildPlans(query: GetChildPlansDto, childId: number) {
		const { skip, take } = getPagination(query.page, query.limit);

		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		const [plans, total] = await this.planRepo.findAndCount({
			skip,
			take,
			where: {
				child: {
					id: child.id
				}
			},
			relations: ['pep3Test'],
			order: {
				createdAt: 'DESC'
			}
		});

		return {
			data: plans,
			count: plans.length,
			total: total,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getChildPlan(childId: number) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		const plan = await this.planRepo.find({
			where: {
				child: {
					id: child.id
				}
			},
			relations: ['goal', 'pep3Test', 'goal.pep3Question', 'goal.pep3Question.pep3Domain'],
			order: {
				createdAt: 'DESC'
			},
			take: 1
		});
		if (plan.length === 0) {
			throw new NotFoundException('!لا يوجد خطة لهذا الطفل');
		}
		return {
			plan: plan[0],
			isActive: true
		};
	}

	async getOnePlan(planId: number) {
		const plan = await this.planRepo.findOne({
			where: {
				id: planId
			},
			relations: ['goal', 'pep3Test', 'goal.pep3Question', 'goal.pep3Question.pep3Domain']
		});
		if (!plan) {
			throw new NotFoundException('!الخطة غير موجودة');
		}

		const child = await this.childRepo.findOne({
			where: {
				plan: {
					id: plan.id
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الطفل غير موجود');
		}

		const childPlan = await this.getChildPlan(child.account.id);

		return {
			plan: plan,
			isActive: childPlan.plan.id === plan.id
		};
	}

	async updatePlan(body: UpdatePlanDto, planId: number) {
		const plan = await this.planRepo.findOne({
			where: {
				id: planId
			},
			relations: [
				'child',
				'child.account',
				'pep3Test',
				'pep3Test.pep3Answer',
				'pep3Test.pep3Answer.pep3Question',
				'pep3Test.pep3Answer.pep3Question.pep3Domain'
			]
		});
		if (!plan) {
			throw new NotFoundException('!الخطة غير موجودة');
		}
		if (plan.child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		const childPlan = await this.getChildPlan(plan.child.account.id);
		if (plan.id !== childPlan.plan.id) {
			throw new BadRequestException('!لا يمكن تعديل هذه الخطة');
		}

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await Promise.all(
				body.goals.map(async (goal) => {
					const question = await this.pep3QuestionRepo.findOne({
						where: {
							id: goal.pep3QuestionId
						},
						relations: ['pep3Domain']
					});
					if (!question) {
						throw new NotFoundException('!الهدف المدخل غير موجود');
					}

					const answer = await Promise.all(
						plan.pep3Test.pep3Answer.filter((pep3Answer) => pep3Answer.pep3Question.id === question.id)
					);
					if (answer.length === 0) {
						throw new BadRequestException('!الاختبار الخاص بهذه الخطة غير مكتمل يرجى إعادة الاختبار');
					}
					if (answer[0].evaluation === 'realized') {
						throw new BadRequestException(`!محقق في اختبار ال بيب 3 <${question.pep3Domain.domain}> هدف المجال`);
					}

					const newGoal = await this.goalRepo.findOne({
						where: {
							plan: {
								id: planId
							},
							pep3Question: {
								id: question.id
							},
							evaluation: 'realized'
						},
						withDeleted: true
					});
					if (newGoal) {
						throw new BadRequestException(`!محقق من قبل في الخطة ${question.pep3Domain.id} هدف المجال`);
					}

					const oldGoal = await this.goalRepo.findOneBy({
						plan: {
							id: planId
						},
						pep3Question: {
							pep3Domain: {
								id: question.pep3Domain.id
							}
						}
					});
					if (oldGoal) {
						await queryRunner.manager.softRemove(oldGoal);
					}

					await queryRunner.manager.save(
						this.goalRepo.create({
							plan: {
								id: plan.id
							},
							pep3Question: {
								id: question.id
							},
							technique: 'optical'
						})
					);
				})
			);

			await queryRunner.commitTransaction();
			return await this.getOnePlan(planId);
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم تعديل الخطة, ${error}`);
		}
	}

	async deletePlan(planId: number) {
		const plan = await this.planRepo.findOne({
			where: {
				id: planId
			},
			relations: ['goal', 'child', 'child.account']
		});
		if (!plan) {
			throw new NotFoundException('!الخطة غير موجودة');
		}
		if (plan.child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		await this.planRepo.softRemove(plan);
		return null;
	}

	async evaluatePlanGoal(body: EvaluatePlanGoalDto, goalId: number) {
		const goal = await this.goalRepo.findOne({
			where: {
				id: goalId
			},
			relations: [
				'pep3Question',
				'pep3Question.pep3Domain',
				'plan',
				'plan.pep3Test',
				'plan.child',
				'plan.child.account'
			]
		});
		if (!goal) {
			throw new NotFoundException('!الهدف غير موجود');
		}
		if (goal.plan.child.account.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}
		const childPlan = await this.getChildPlan(goal.plan.child.account.id);
		if (goal.plan.id !== childPlan.plan.id) {
			throw new BadRequestException('!لا يمكن تقييم هذه الخطة');
		}

		Object.assign(goal, body);
		await this.goalRepo.save(goal);

		const idx = goal.pep3Question.pep3Domain.id !== 11 ? goal.pep3Question.pep3Domain.id - 1 : 6;
		const question = (await this.generateGoalsOfPlan(goal.plan.pep3Test.id))[idx];

		if (question !== null) {
			await this.updatePlan(
				{
					goals: [
						{
							pep3QuestionId: question.id
						}
					]
				},
				goal.plan.id
			);
		}

		return await this.getOnePlan(goal.plan.id);
	}

	async getPlanProgressiveReport(query: GetPlanProgressiveReportDto, planId: number) {
		const plan = await this.planRepo.findOne({
			where: {
				id: planId
			}
		});
		if (!plan) {
			throw new NotFoundException('!الخطة غير موجودة');
		}

		const domainIds = [1, 2, 3, 4, 5, 6, 11];

		if (query.domainId) {
			const idx = domainIds.indexOf(query.domainId);
			if (idx === -1) {
				throw new BadRequestException('!لا يمكن إيجاد تقرير لهذا المجال، أو أن المجال غير موجود');
			}

			return await Promise.all([
				this.goalRepo.find({
					where: { pep3Question: { pep3Domain: { id: domainIds[idx] } }, plan: { id: plan.id } },
					withDeleted: true,
					order: { createdAt: 'ASC' },
					relations: ['pep3Question', 'pep3Question.pep3Domain']
				})
			]);
		}

		return await Promise.all([
			this.goalRepo.find({
				where: { pep3Question: { pep3Domain: { id: domainIds[0] } }, plan: { id: plan.id } },
				withDeleted: true,
				order: { createdAt: 'ASC' },
				relations: ['pep3Question', 'pep3Question.pep3Domain']
			}),
			this.goalRepo.find({
				where: { pep3Question: { pep3Domain: { id: domainIds[1] } }, plan: { id: plan.id } },
				withDeleted: true,
				order: { createdAt: 'ASC' },
				relations: ['pep3Question', 'pep3Question.pep3Domain']
			}),
			this.goalRepo.find({
				where: { pep3Question: { pep3Domain: { id: domainIds[2] } }, plan: { id: plan.id } },
				withDeleted: true,
				order: { createdAt: 'ASC' },
				relations: ['pep3Question', 'pep3Question.pep3Domain']
			}),
			this.goalRepo.find({
				where: { pep3Question: { pep3Domain: { id: domainIds[3] } }, plan: { id: plan.id } },
				withDeleted: true,
				order: { createdAt: 'ASC' },
				relations: ['pep3Question', 'pep3Question.pep3Domain']
			}),
			this.goalRepo.find({
				where: { pep3Question: { pep3Domain: { id: domainIds[4] } }, plan: { id: plan.id } },
				withDeleted: true,
				order: { createdAt: 'ASC' },
				relations: ['pep3Question', 'pep3Question.pep3Domain']
			}),
			this.goalRepo.find({
				where: { pep3Question: { pep3Domain: { id: domainIds[5] } }, plan: { id: plan.id } },
				withDeleted: true,
				order: { createdAt: 'ASC' },
				relations: ['pep3Question', 'pep3Question.pep3Domain']
			}),
			this.goalRepo.find({
				where: { pep3Question: { pep3Domain: { id: domainIds[6] } }, plan: { id: plan.id } },
				withDeleted: true,
				order: { createdAt: 'ASC' },
				relations: ['pep3Question', 'pep3Question.pep3Domain']
			})
		]);
	}

	async getUnrealizedGoal(domainId: number, planId: number) {
		const plan = await this.planRepo.findOne({
			where: {
				id: planId
			},
			relations: ['pep3Test']
		});
		if (!plan) {
			throw new NotFoundException('!الخطة غير موجودة');
		}

		const allGoal = await this.pep3QuestionRepo.find({
			where: {
				pep3Domain: {
					id: domainId
				}
			}
		});

		const realizedGoal = await this.goalRepo.find({
			where: {
				pep3Question: {
					pep3Domain: {
						id: domainId
					}
				},
				plan: {
					id: planId
				},
				evaluation: 'realized'
			},
			relations: ['pep3Question'],
			withDeleted: true
		});

		const result = allGoal.filter((goal) => {
			for (let i = 0; i < realizedGoal.length; i++) {
				if (realizedGoal[i].pep3Question.id == goal.id) {
					return null;
				}
			}
			return goal;
		});

		const pep3Answers = await this.pep3QuestionRepo.find({
			where: {
				pep3Answer: {
					pep3Test: {
						id: plan.pep3Test.id
					},
					evaluation: 'realized'
				}
			}
		});

		const res = result.filter((pep3Answer) => {
			for (let i = 0; i < pep3Answers.length; i++) {
				if (pep3Answers[i].id == pep3Answer.id) {
					return null;
				}
			}
			return pep3Answer;
		});

		return res;
	}
}
