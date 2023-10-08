import {
	Injectable,
	NotFoundException,
	BadRequestException,
	UnauthorizedException,
	InternalServerErrorException
} from '@nestjs/common';
import { DataSource, Repository, Like, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmail } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import {
	Goal,
	Plan,
	Child,
	Account,
	Pep3Age,
	Message,
	Profile,
	Teacher,
	Pep3Test,
	HomeTask,
	Pep3Answer,
	CenterNote,
	FamilyNote,
	ClassChild,
	CenterTask,
	Supervisor,
	Specialist,
	RegisterDto,
	ChildNeedLog,
	ProgramChild,
	ClassTeacher,
	ChildHomeTask,
	UserAgentModel,
	ChildNeedLevel,
	ClassSpecialist,
	ChildCenterTask,
	PaginationModel,
	ChildWaitingTime,
	InternalHomeTask,
	ExternalHomeTask,
	ResetPasswordDto,
	ChildTimeExercise,
	GetManyAccountDto,
	UpdatePasswordDto,
	InternalCenterTask,
	ExternalCenterTask,
	InternalHomeTaskLog,
	ExternalHomeTaskLog,
	ChildTimeExerciseLog,
	InternalCenterTaskLog,
	ExternalCenterTaskLog,
	UpdateFamilyPasswordDto
} from '@autism/shared/type';
import { getPagination } from '@autism/shared/util';
import { allowedToUse } from '@autism/account-management/authorization';

@Injectable()
export class AccountService {
	constructor(
		private dataSource: DataSource,
		private jwtService: JwtService,
		@InjectRepository(Child)
		private childRepository: Repository<Child>,
		@InjectRepository(Account)
		private accountRepository: Repository<Account>,
		@InjectRepository(Teacher)
		private teacherRepository: Repository<Teacher>,
		@InjectRepository(Profile)
		private profileRepository: Repository<Profile>,
		@InjectRepository(Supervisor)
		private supervisorRepository: Repository<Supervisor>,
		@InjectRepository(Specialist)
		private specialistRepository: Repository<Specialist>,
		@InjectRepository(ChildNeedLevel)
		private childNeedLevelRepository: Repository<ChildNeedLevel>
	) {}

	async register(body: RegisterDto, accounts: Account) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			let account = await this.accountRepository.findOne({
				where: [{ email: body.email }, { userName: body.userName }],
				withDeleted: true
			});
			if (account) {
				throw new BadRequestException('!البريد الإلكتروني أو اسم المستخدم موجود سابقا');
			}

			account = await queryRunner.manager.save(
				this.accountRepository.create({
					email: body.email,
					password: await bcrypt.hash(body.password, await bcrypt.genSalt()),
					userName: body.userName,
					accountType: body.accountType
				})
			);

			account.profile = await queryRunner.manager.save(
				this.profileRepository.create({
					account: {
						id: account.id
					},
					firstName: body.firstName,
					lastName: body.lastName,
					middleName: body.middleName,
					birthday: body.birthday ? new Date(body.birthday) : undefined,
					phoneNumber: body.phoneNumber,
					homeAddress: body.homeAddress,
					nationality: body.nationality
				})
			);

			let accountTypeEntity = null;
			if (body.accountType == 'child') {
				accountTypeEntity = this.childRepository.create({
					account: {
						id: account.id
					},
					familyPassword: await bcrypt.hash(body.familyPassword, await bcrypt.genSalt()),
					guardianName: body.guardianName,
					motherName: body.motherName
				});
			} else if (body.accountType == 'supervisor') {
				accountTypeEntity = this.supervisorRepository.create({
					account: {
						id: account.id
					}
				});
			} else if (body.accountType == 'specialist') {
				accountTypeEntity = this.specialistRepository.create({
					account: {
						id: account.id
					}
				});
			} else if (body.accountType == 'teacher') {
				accountTypeEntity = this.teacherRepository.create({
					account: {
						id: account.id
					}
				});
			}

			const newAccountTypeEntity = await queryRunner.manager.save(accountTypeEntity);

			if (body.accountType == 'child') {
				await queryRunner.manager.save(
					this.childNeedLevelRepository.create({
						child: {
							id: newAccountTypeEntity?.id
						},
						needLevel: 1,
						createdBy: {
							id: accounts.id
						}
					})
				);
			}

			await queryRunner.commitTransaction();

			return account;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم تسجيل الحساب, ${error}`);
		}
	}

	async validateUserCredentials(email: string, password: string): Promise<null | Account> {
		const account = await this.accountRepository.findOneBy(isEmail(email) ? { email: email } : { userName: email });
		if (!account || !(await account.validatePassword(password))) return null;
		return account;
	}

	async login(account: Account, userAgent: UserAgentModel) {
		if (account.isBlocked) {
			throw new UnauthorizedException('!هذا الحساب محظور');
		}

		// TODO: remove the outer if statement
		if (!userAgent.isHTTPClient) {
			if (account.accountType === 'child' && !userAgent.isFlutterApp) {
				throw new UnauthorizedException('لا يمكن تسجيل الدخول الى حساب طفل من خارج تطبيق الموبايل');
			}
			if (account.accountType !== 'child' && !userAgent.isWebBrowser) {
				throw new UnauthorizedException('!لا يمكن تسجيل الدخول الى حساب معلم ,أخصائي أو مشرف من خارج متصفح الويب');
			}
		}

		return {
			account,
			accessToken: this.jwtService.sign({
				sub: account
			})
		};
	}

	async getOneAccount(accountId: number) {
		const account = await this.accountRepository.findOne({
			where: {
				id: accountId
			},
			relations: ['profile', 'child', 'child.classChild', 'child.classChild.cls', 'child.childNeedLevel']
		});

		if (!account) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		return account;
	}

	async resetPassword(body: ResetPasswordDto, accountId: number, requestOwnerAccount: Account) {
		const account = await this.accountRepository.findOne({
			where: {
				id: accountId
			}
		});

		if (!account) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		if (!allowedToUse(requestOwnerAccount, account.id)) {
			throw new UnauthorizedException('!غير مصرح لك بتعديل هذا العنصر');
		}

		account.password = await bcrypt.hash(body.newPassword, await bcrypt.genSalt());
		await this.accountRepository.save(account);
		return null;
	}

	async updatePassword(body: UpdatePasswordDto, accountId: number, requestOwnerAccount: Account) {
		const account = await this.accountRepository.findOne({
			where: {
				id: accountId
			}
		});
		if (!account) {
			throw new NotFoundException('!الحساب غير موجود');
		}
		if (!allowedToUse(requestOwnerAccount, account.id)) {
			throw new UnauthorizedException('!غير مصرح لك بتعديل هذا العنصر');
		}
		if (account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}
		if (!(await account.validatePassword(body.oldPassword))) {
			throw new BadRequestException('!كلمة السر القديمة غير صحيحة');
		}
		if (body.oldPassword === body.newPassword) {
			throw new BadRequestException('!كلمة السر القديمة يجب أن لا تتطابق كلمة السر القديمة');
		}

		account.password = await bcrypt.hash(body.newPassword, await bcrypt.genSalt());
		await this.accountRepository.save(account);
		return null;
	}

	async updateFamilyPassword(body: UpdateFamilyPasswordDto, accountId: number, requestOwnerAccount: Account) {
		const child = await this.childRepository.findOne({
			where: {
				account: {
					id: accountId
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الحساب غير موجود أو الحساب ليس حساب طفل');
		}
		if (!allowedToUse(requestOwnerAccount, child.account.id)) {
			throw new UnauthorizedException('!غير مصرح لك بتعديل هذا العنصر');
		}
		if (child.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}
		if (!(await child.validatePassword(body.oldFamilyPassword))) {
			throw new BadRequestException('!كلمة السر القديمة غير صحيحة');
		}
		if (body.oldFamilyPassword === body.newFamilyPassword) {
			throw new BadRequestException('!كلمة السر الجديدة يجب أن لا تتطابق كلمة السر القديمة');
		}

		child.familyPassword = await bcrypt.hash(body.newFamilyPassword, await bcrypt.genSalt());
		await this.childRepository.save(child);
		return null;
	}

	async blockAccount(accountId: number) {
		const account = await this.accountRepository.findOne({
			where: {
				id: accountId
			}
		});

		if (!account) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		account.isBlocked = !account.isBlocked;
		await this.accountRepository.save(account);
		return null;
	}

	async deleteSupervisor(id: number) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.getRepository<Message>(Message).softRemove(
				await queryRunner.manager.getRepository<Message>(Message).find({
					where: {
						sender: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Message>(Message).softRemove(
				await queryRunner.manager.getRepository<Message>(Message).find({
					where: {
						receiver: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Supervisor>(Supervisor).softRemove(
				await queryRunner.manager.getRepository<Supervisor>(Supervisor).find({
					where: {
						account: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Profile>(Profile).softRemove(
				await queryRunner.manager.getRepository<Profile>(Profile).find({
					where: {
						account: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Account>(Account).softRemove(
				await queryRunner.manager.getRepository<Account>(Account).find({
					where: {
						id: id
					}
				})
			);

			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم حذف الحساب, ${error}`);
		}
	}

	async deleteSpecialist(id: number) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.getRepository<Message>(Message).softRemove(
				await queryRunner.manager.getRepository<Message>(Message).find({
					where: {
						sender: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Message>(Message).softRemove(
				await queryRunner.manager.getRepository<Message>(Message).find({
					where: {
						receiver: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ClassSpecialist>(ClassSpecialist).softRemove(
				await queryRunner.manager.getRepository<ClassSpecialist>(ClassSpecialist).find({
					where: {
						specialist: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Specialist>(Specialist).softRemove(
				await queryRunner.manager.getRepository<Specialist>(Specialist).find({
					where: {
						account: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Profile>(Profile).softRemove(
				await queryRunner.manager.getRepository<Profile>(Profile).find({
					where: {
						account: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Account>(Account).softRemove(
				await queryRunner.manager.getRepository<Account>(Account).find({
					where: {
						id: id
					}
				})
			);

			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم حذف الحساب, ${error}`);
		}
	}

	async deleteTeacher(id: number) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.getRepository<Message>(Message).softRemove(
				await queryRunner.manager.getRepository<Message>(Message).find({
					where: {
						sender: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Message>(Message).softRemove(
				await queryRunner.manager.getRepository<Message>(Message).find({
					where: {
						receiver: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<InternalCenterTaskLog>(InternalCenterTaskLog).softRemove(
				await queryRunner.manager.getRepository<InternalCenterTaskLog>(InternalCenterTaskLog).find({
					where: {
						internalCenterTask: {
							centerTask: {
								teacher: {
									account: {
										id: id
									}
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ExternalCenterTaskLog>(ExternalCenterTaskLog).softRemove(
				await queryRunner.manager.getRepository<ExternalCenterTaskLog>(ExternalCenterTaskLog).find({
					where: {
						externalCenterTask: {
							centerTask: {
								teacher: {
									account: {
										id: id
									}
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<InternalCenterTask>(InternalCenterTask).softRemove(
				await queryRunner.manager.getRepository<InternalCenterTask>(InternalCenterTask).find({
					where: {
						centerTask: {
							teacher: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ExternalCenterTask>(ExternalCenterTask).softRemove(
				await queryRunner.manager.getRepository<ExternalCenterTask>(ExternalCenterTask).find({
					where: {
						centerTask: {
							teacher: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildCenterTask>(ChildCenterTask).softRemove(
				await queryRunner.manager.getRepository<ChildCenterTask>(ChildCenterTask).find({
					where: {
						centerTask: {
							teacher: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<CenterTask>(CenterTask).softRemove(
				await queryRunner.manager.getRepository<CenterTask>(CenterTask).find({
					where: {
						teacher: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<InternalHomeTaskLog>(InternalHomeTaskLog).softRemove(
				await queryRunner.manager.getRepository<InternalHomeTaskLog>(InternalHomeTaskLog).find({
					where: {
						internalHomeTask: {
							homeTask: {
								teacher: {
									account: {
										id: id
									}
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ExternalHomeTaskLog>(ExternalHomeTaskLog).softRemove(
				await queryRunner.manager.getRepository<ExternalHomeTaskLog>(ExternalHomeTaskLog).find({
					where: {
						externalHomeTask: {
							homeTask: {
								teacher: {
									account: {
										id: id
									}
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<InternalHomeTask>(InternalHomeTask).softRemove(
				await queryRunner.manager.getRepository<InternalHomeTask>(InternalHomeTask).find({
					where: {
						homeTask: {
							teacher: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ExternalHomeTask>(ExternalHomeTask).softRemove(
				await queryRunner.manager.getRepository<ExternalHomeTask>(ExternalHomeTask).find({
					where: {
						homeTask: {
							teacher: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildHomeTask>(ChildHomeTask).softRemove(
				await queryRunner.manager.getRepository<ChildHomeTask>(ChildHomeTask).find({
					where: {
						homeTask: {
							teacher: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<HomeTask>(HomeTask).softRemove(
				await queryRunner.manager.getRepository<HomeTask>(HomeTask).find({
					where: {
						teacher: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ClassTeacher>(ClassTeacher).softRemove(
				await queryRunner.manager.getRepository<ClassTeacher>(ClassTeacher).find({
					where: {
						teacher: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Teacher>(Teacher).softRemove(
				await queryRunner.manager.getRepository<Teacher>(Teacher).find({
					where: {
						account: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Profile>(Profile).softRemove(
				await queryRunner.manager.getRepository<Profile>(Profile).find({
					where: {
						account: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Account>(Account).softRemove(
				await queryRunner.manager.getRepository<Account>(Account).find({
					where: {
						id: id
					}
				})
			);

			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم حذف الحساب, ${error}`);
		}
	}

	async deleteChild(id: number) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			await queryRunner.manager.getRepository<Message>(Message).softRemove(
				await queryRunner.manager.getRepository<Message>(Message).find({
					where: {
						sender: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Message>(Message).softRemove(
				await queryRunner.manager.getRepository<Message>(Message).find({
					where: {
						receiver: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Goal>(Goal).softRemove(
				await queryRunner.manager.getRepository<Goal>(Goal).find({
					where: {
						plan: {
							pep3Test: {
								child: {
									account: {
										id: id
									}
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Plan>(Plan).softRemove(
				await queryRunner.manager.getRepository<Plan>(Plan).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Pep3Age>(Pep3Age).softRemove(
				await queryRunner.manager.getRepository<Pep3Age>(Pep3Age).find({
					where: {
						pep3Test: {
							child: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Pep3Answer>(Pep3Answer).softRemove(
				await queryRunner.manager.getRepository<Pep3Answer>(Pep3Answer).find({
					where: {
						pep3Test: {
							child: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Pep3Test>(Pep3Test).softRemove(
				await queryRunner.manager.getRepository<Pep3Test>(Pep3Test).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<CenterNote>(CenterNote).softRemove(
				await queryRunner.manager.getRepository<CenterNote>(CenterNote).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<FamilyNote>(FamilyNote).softRemove(
				await queryRunner.manager.getRepository<FamilyNote>(FamilyNote).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ClassChild>(ClassChild).softRemove(
				await queryRunner.manager.getRepository<ClassChild>(ClassChild).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildNeedLevel>(ChildNeedLevel).softRemove(
				await queryRunner.manager.getRepository<ChildNeedLevel>(ChildNeedLevel).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildNeedLog>(ChildNeedLog).softRemove(
				await queryRunner.manager.getRepository<ChildNeedLog>(ChildNeedLog).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ProgramChild>(ProgramChild).softRemove(
				await queryRunner.manager.getRepository<ProgramChild>(ProgramChild).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<InternalCenterTaskLog>(InternalCenterTaskLog).softRemove(
				await queryRunner.manager.getRepository<InternalCenterTaskLog>(InternalCenterTaskLog).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ExternalCenterTaskLog>(ExternalCenterTaskLog).softRemove(
				await queryRunner.manager.getRepository<ExternalCenterTaskLog>(ExternalCenterTaskLog).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildCenterTask>(ChildCenterTask).softRemove(
				await queryRunner.manager.getRepository<ChildCenterTask>(ChildCenterTask).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<InternalHomeTaskLog>(InternalHomeTaskLog).softRemove(
				await queryRunner.manager.getRepository<InternalHomeTaskLog>(InternalHomeTaskLog).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ExternalHomeTaskLog>(ExternalHomeTaskLog).softRemove(
				await queryRunner.manager.getRepository<ExternalHomeTaskLog>(ExternalHomeTaskLog).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildHomeTask>(ChildHomeTask).softRemove(
				await queryRunner.manager.getRepository<ChildHomeTask>(ChildHomeTask).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildTimeExerciseLog>(ChildTimeExerciseLog).softRemove(
				await queryRunner.manager.getRepository<ChildTimeExerciseLog>(ChildTimeExerciseLog).find({
					where: {
						childTimeExercise: {
							child: {
								account: {
									id: id
								}
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildTimeExercise>(ChildTimeExercise).softRemove(
				await queryRunner.manager.getRepository<ChildTimeExercise>(ChildTimeExercise).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<ChildWaitingTime>(ChildWaitingTime).softRemove(
				await queryRunner.manager.getRepository<ChildWaitingTime>(ChildWaitingTime).find({
					where: {
						child: {
							account: {
								id: id
							}
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Child>(Child).softRemove(
				await queryRunner.manager.getRepository<Child>(Child).find({
					where: {
						account: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Profile>(Profile).softRemove(
				await queryRunner.manager.getRepository<Profile>(Profile).find({
					where: {
						account: {
							id: id
						}
					}
				})
			);

			await queryRunner.manager.getRepository<Account>(Account).softRemove(
				await queryRunner.manager.getRepository<Account>(Account).find({
					where: {
						id: id
					}
				})
			);

			await queryRunner.commitTransaction();
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم حذف الحساب, ${error}`);
		}
	}

	async deleteAccount(accountId: number) {
		const user = await this.accountRepository.findOne({
			where: {
				id: accountId
			}
		});
		if (!user) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		if (user.accountType === 'supervisor') {
			await this.deleteSupervisor(user.id);
		} else if (user.accountType === 'specialist') {
			await this.deleteSpecialist(user.id);
		} else if (user.accountType === 'teacher') {
			await this.deleteTeacher(user.id);
		} else if (user.accountType === 'child') {
			await this.deleteChild(user.id);
		}

		return null;
	}

	async getManyAccount(query: GetManyAccountDto, account: Account): Promise<PaginationModel<Account>> {
		const queryProps = {
			accountType: query.accountType || '',
			isBlocked: query.isBlocked === undefined ? 0 : query.isBlocked === 'true' ? 1 : 2,
			word: query.word || '',
			limit: query.limit,
			page: query.page
		};

		const { take, skip } = getPagination(queryProps.page, queryProps.limit);

		const [accounts, total] = await this.accountRepository.findAndCount({
			skip,
			take,
			where: [
				{
					id: Not(account.id),
					profile: {
						firstName: Like(`%${queryProps.word}%`)
					},
					accountType: Like(`%${queryProps.accountType}%`),
					isBlocked: queryProps.isBlocked === 0 ? undefined : queryProps.isBlocked === 1
				},
				{
					id: Not(account.id),
					profile: {
						lastName: Like(`%${queryProps.word}%`)
					},
					accountType: Like(`%${queryProps.accountType}%`),
					isBlocked: queryProps.isBlocked === 0 ? undefined : queryProps.isBlocked === 1
				}
			],
			relations: ['profile', 'child', 'child.classChild', 'child.classChild.cls', 'child.childNeedLevel'],
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: accounts,
			count: accounts.length,
			total: total,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}
}
