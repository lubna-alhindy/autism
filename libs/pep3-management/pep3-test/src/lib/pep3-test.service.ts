import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import {
	Child,
	Account,
	Pep3Age,
	Profile,
	Pep3Test,
	Pep3Answer,
	Pep3Domain,
	Pep3Question,
	CreatePep3TestDto,
	CreatePep3TestModel,
	SubmitDomainAnswersDto,
	ProfileOfDevelopmentalAge
} from '@autism/shared/type';

@Injectable()
export class Pep3TestService {
	constructor(
		private dataSource: DataSource,
		@InjectRepository(Child) private childRepo: Repository<Child>,
		@InjectRepository(Profile) private profileRepo: Repository<Profile>,
		@InjectRepository(Pep3Age) private pep3AgeRepo: Repository<Pep3Age>,
		@InjectRepository(Pep3Test) private pep3TestRepo: Repository<Pep3Test>,
		@InjectRepository(Pep3Domain) private pep3DomainRepo: Repository<Pep3Domain>,
		@InjectRepository(Pep3Answer) private pep3AnswerRepo: Repository<Pep3Answer>,
		@InjectRepository(Pep3Question) private pep3QuestionRepo: Repository<Pep3Question>,
		@InjectRepository(ProfileOfDevelopmentalAge) private devAgeRepo: Repository<ProfileOfDevelopmentalAge>
	) {}

	async getPep3Domain() {
		return await this.pep3DomainRepo.find();
	}

	async getPep3Question(domainId: number) {
		const domain = await this.pep3DomainRepo.findOne({
			where: {
				id: domainId
			}
		});
		if (!domain) {
			throw new NotFoundException('!هذاالمجال غير موجود');
		}

		return await this.pep3QuestionRepo.find({
			where: {
				pep3Domain: {
					id: domainId
				}
			}
		});
	}

	async getPep3Tests(childId: number, account: Account) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: childId
				}
			}
		});
		if (!child) {
			throw new NotFoundException('!هذا الطفل غير موجود ');
		}

		const pep3Tests = await this.pep3TestRepo.find({
			where: {
				child: {
					account: {
						id: childId
					}
				}
			},
			relations: ['pep3Age', 'plan'],
			order: {
				createdAt: 'DESC'
			}
		});

		if (account.accountType === 'child') {
			return await Promise.all(pep3Tests.filter((pep3Test) => pep3Test.pep3Age.length > 0));
		}

		return await Promise.all(
			pep3Tests.map(async (pep3Test) => {
				pep3Test.currentDomainId = 1;
				for (; pep3Test.currentDomainId <= 11; pep3Test.currentDomainId++) {
					const answer = await this.pep3AnswerRepo.findOneBy({
						pep3Test: {
							id: pep3Test.id
						},
						pep3Question: {
							pep3Domain: {
								id: pep3Test.currentDomainId
							}
						}
					});

					if (!answer) {
						break;
					}
				}

				if (pep3Test.currentDomainId === 12) {
					pep3Test.currentDomainId = null;
				}

				return pep3Test;
			})
		);
	}

	async createPep3Test(body: CreatePep3TestDto): Promise<CreatePep3TestModel> {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: body.childId
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

		const cnt = await this.pep3TestRepo.count({
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
			let test = this.pep3TestRepo.create({
				behaviorDescription: body.behaviorDescription,
				bodyDescription: body.bodyDescription,
				child: {
					id: child.id
				},
				name: `الاختبار  #${cnt + 1}`
			});
			test = await queryRunner.manager.save(test);

			await queryRunner.commitTransaction();

			return {
				pep3Test: test,
				currentDomainId: 1
			};
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إنشاء الاختبار, ${error}`);
		}
	}

	async submitDomainAnswers(body: SubmitDomainAnswersDto, pep3TestId: number) {
		const pep3Test = await this.pep3TestRepo.findOneBy({
			id: pep3TestId
		});
		if (!pep3Test) {
			throw new NotFoundException('!الاختبار غير موجود');
		}

		const domain = await this.pep3DomainRepo.findOne({
			where: {
				id: body.currentDomainId
			}
		});
		if (!domain) {
			throw new NotFoundException('!هذاالمجال غير موجود');
		}

		const answer = await this.pep3AnswerRepo.find({
			where: {
				pep3Test: {
					id: pep3Test.id
				},
				pep3Question: {
					pep3Domain: {
						id: body.currentDomainId
					}
				}
			}
		});

		if (answer.length != 0) {
			await Promise.all(
				body.pep3Answers.map(async (pep3Answer) => {
					const answer = await this.pep3AnswerRepo.findOneBy({
						pep3Test: {
							id: pep3Test.id
						},
						pep3Question: {
							id: pep3Answer.questionId
						}
					});
					if (!answer) {
						throw new NotFoundException('!الجواب غير موجود');
					}

					answer.evaluation = pep3Answer.evaluation;
					await this.pep3AnswerRepo.save(answer);
					return pep3Answer;
				})
			);
		} else {
			await Promise.all(
				body.pep3Answers.map(async (pep3Answer) => {
					const answer = this.pep3AnswerRepo.create({
						evaluation: pep3Answer.evaluation,
						pep3Test: {
							id: pep3TestId
						},
						pep3Question: {
							id: pep3Answer.questionId
						}
					});
					await this.pep3AnswerRepo.save(answer);
					return pep3Answer;
				})
			);
		}
		return null;
	}

	async getPep3TestResult(pep3TestId: number) {
		const pep3Test = await this.pep3TestRepo.findOne({
			where: {
				id: pep3TestId
			},
			relations: ['child', 'child.account']
		});
		if (!pep3Test) {
			throw new NotFoundException('!الاختبار غير موجود');
		}

		const profile = await this.profileRepo.findOne({
			where: {
				account: {
					id: pep3Test.child.account.id
				}
			}
		});
		if (!profile) {
			throw new NotFoundException('!الملف الشخصي غير موجود');
		}

		let realAge = 0;
		if (profile.birthday) {
			const currentDate = new Date();

			let year = currentDate.getFullYear() - new Date(profile.birthday).getFullYear();
			let month = 0;

			if (currentDate.getMonth() >= new Date(profile.birthday).getMonth()) {
				month = currentDate.getMonth() - new Date(profile.birthday).getMonth();
			} else {
				year--;
				month = 12 + currentDate.getMonth() - new Date(profile.birthday).getMonth();
			}
			realAge = month + year * 12;
		}

		const pep3Age = await this.pep3AgeRepo.find({
			where: {
				pep3Test: {
					id: pep3TestId
				}
			},
			relations: ['pep3Domain']
		});

		let communicativeDevelopmentalAge = 0;
		let motorDevelopmentalAge = 0;
		pep3Age.forEach((res) => {
			if (res.pep3Domain.id <= 3) {
				communicativeDevelopmentalAge += res.age;
			} else if (res.pep3Domain.id <= 6) {
				motorDevelopmentalAge += res.age;
			}
		});

		communicativeDevelopmentalAge /= 3;
		communicativeDevelopmentalAge = Math.round(communicativeDevelopmentalAge);

		motorDevelopmentalAge /= 3;
		motorDevelopmentalAge = Math.round(motorDevelopmentalAge);

		return {
			pep3Age: pep3Age,
			communicativeDevelopmentalAge: {
				age: communicativeDevelopmentalAge
			},
			motorDevelopmentalAge: {
				age: motorDevelopmentalAge
			},
			realAge: {
				age: realAge
			}
		};
	}

	async submitPep3Test(pep3TestId: number) {
		const pep3Test = await this.pep3TestRepo.findOneBy({
			id: pep3TestId
		});
		if (!pep3Test) {
			throw new NotFoundException('!الاختبار غير موجود');
		}

		const answers = await this.pep3AnswerRepo.find({
			where: {
				pep3Test: {
					id: pep3TestId
				}
			},
			relations: ['pep3Question', 'pep3Question.pep3Domain']
		});

		const evaluationSum: number[] = [];
		for (let i = 0; i < 12; i++) {
			evaluationSum.push(0);
		}

		for (const answer of answers) {
			let sum = 0;
			if (answer.evaluation === 'partially realized') {
				sum = 1;
			} else if (answer.evaluation === 'realized') {
				sum = 2;
			}
			evaluationSum[answer.pep3Question.pep3Domain.id] += sum;
		}

		for (let i = 1; i < 12; i++) {
			let evalAge = evaluationSum[i];
			if (7 > i || i > 10) {
				const age = await this.devAgeRepo.findOneBy({
					domainAge: evaluationSum[i],
					pep3Domain: {
						id: i
					}
				});
				if (!age) {
					throw new NotFoundException('عمر التطور النمائي غير موجود');
				}
				evalAge = age.ageInMonths;
			}

			await this.pep3AgeRepo.save(
				this.pep3AgeRepo.create({
					age: evalAge,
					pep3Domain: {
						id: i
					},
					pep3Test: {
						id: pep3TestId
					}
				})
			);
		}

		return this.getPep3TestResult(pep3TestId);
	}

	async getAnswersOfDomain(pep3TestId: number, domainId: number) {
		const pep3Test = await this.pep3TestRepo.findOneBy({
			id: pep3TestId
		});
		if (!pep3Test) {
			throw new NotFoundException('!الاختبار غير موجود');
		}

		const domain = await this.pep3DomainRepo.findOne({
			where: {
				id: domainId
			}
		});
		if (!domain) {
			throw new NotFoundException('!هذاالمجال غير موجود');
		}

		return await this.pep3AnswerRepo.find({
			where: {
				pep3Test: {
					id: pep3TestId
				},
				pep3Question: {
					pep3Domain: {
						id: domainId
					}
				}
			},
			relations: ['pep3Question', 'pep3Question.pep3Domain', 'pep3Test']
		});
	}

	async deletePep3Test(pep3TestId: number) {
		const pep3Test = await this.pep3TestRepo.findOne({
			where: {
				id: pep3TestId
			},
			relations: ['pep3Answer', 'pep3Age', 'plan', 'plan.goal']
		});
		if (!pep3Test) {
			throw new NotFoundException('!الاختبار غير موجود');
		}

		await this.pep3TestRepo.softRemove(pep3Test);
		return true;
	}
}
