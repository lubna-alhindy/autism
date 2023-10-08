import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import {
	Class,
	Child,
	Account,
	Teacher,
	ClassChild,
	Specialist,
	ClassTeacher,
	CreateClassDto,
	UpdateClassDto,
	GetManyClassDto,
	ClassSpecialist,
	PaginationModel,
	GetClassChildsDto,
	GetClassTeachersDto,
	GetChildTeachersDto,
	GetTeacherClassesDto,
	GetChildSpecialistsDto,
	GetClassSpecialistsDto,
	GetSpecialistClassesDto,
	GetChildUnassignedToClassDto
} from '@autism/shared/type';
import { getPagination } from '@autism/shared/util';

@Injectable()
export class ClassService {
	constructor(
		@InjectRepository(Class) private classRepo: Repository<Class>,
		@InjectRepository(Child) private childRepo: Repository<Child>,
		@InjectRepository(Account) private accountRepo: Repository<Account>,
		@InjectRepository(Teacher) private teacherRepo: Repository<Teacher>,
		@InjectRepository(Specialist) private specialistRepo: Repository<Specialist>,
		@InjectRepository(ClassChild) private classChildRepo: Repository<ClassChild>,
		@InjectRepository(ClassTeacher) private classTeacherRepo: Repository<ClassTeacher>,
		@InjectRepository(ClassSpecialist) private classSpecialistRepo: Repository<ClassSpecialist>
	) {}

	async createClass(body: CreateClassDto, account: Account) {
		const cls = await this.classRepo.findOne({
			where: {
				name: body.name
			}
		});

		if (cls) {
			throw new BadRequestException('!هذا الاسم مستخدم سابقا');
		}

		return await this.classRepo.save(
			this.classRepo.create({
				level: body.level,
				name: body.name,
				createdBy: {
					id: account.id
				}
			})
		);
	}

	async getManyClass(query: GetManyClassDto): Promise<PaginationModel<Class>> {
		const { skip, take } = getPagination(query.page, query.limit);

		const [cls, total] = await this.classRepo.findAndCount({
			skip,
			take,
			where: {
				name: Like(`%${query.word || ''}%`),
				level: Like(`%${query.level || ''}%`)
			},
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: cls,
			total: total,
			count: cls.length,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getOneClass(classId: number) {
		const cls = await this.classRepo.findOneBy({
			id: classId
		});

		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		return cls;
	}

	async updateClass(body: UpdateClassDto, classId: number) {
		const cls = await this.classRepo.findOneBy({
			id: classId
		});

		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		Object.assign(cls, body);
		return await this.classRepo.save(cls);
	}

	async getChildTeachers(query: GetChildTeachersDto, accountId: number): Promise<PaginationModel<Account>> {
		const queryProps = {
			isBlocked: query.isBlocked === undefined ? 0 : query.isBlocked === 'true' ? 1 : 2,
			word: query.word || '',
			limit: query.limit,
			page: query.page
		};

		const { skip, take } = getPagination(queryProps.page, queryProps.limit);

		const [teacher, total] = await this.accountRepo.findAndCount({
			skip,
			take,
			where: {
				teacher: {
					classTeacher: {
						cls: {
							classChild: {
								child: {
									account: {
										id: accountId
									}
								}
							}
						}
					}
				},
				profile: [
					{
						firstName: Like(`%${queryProps.word}%`)
					},
					{
						middleName: Like(`%${queryProps.word}%`)
					},
					{
						lastName: Like(`%${queryProps.word}%`)
					}
				],
				isBlocked: queryProps.isBlocked === 0 ? undefined : queryProps.isBlocked === 1
			},
			relations: ['profile'],
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: teacher,
			total: total,
			count: teacher.length,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getChildSpecialists(query: GetChildSpecialistsDto, accountId: number): Promise<PaginationModel<Account>> {
		const queryProps = {
			isBlocked: query.isBlocked === undefined ? 0 : query.isBlocked === 'true' ? 1 : 2,
			word: query.word || '',
			limit: query.limit,
			page: query.page
		};

		const { skip, take } = getPagination(query.page, query.limit);

		const [specialist, total] = await this.accountRepo.findAndCount({
			skip,
			take,
			where: {
				specialist: {
					classSpecialist: {
						cls: {
							classChild: {
								child: {
									account: {
										id: accountId
									}
								}
							}
						}
					}
				},
				profile: [
					{
						firstName: Like(`%${queryProps.word}%`)
					},
					{
						middleName: Like(`%${queryProps.word}%`)
					},
					{
						lastName: Like(`%${queryProps.word}%`)
					}
				],
				isBlocked: queryProps.isBlocked === 0 ? undefined : queryProps.isBlocked === 1
			},
			relations: ['profile'],
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: specialist,
			total: total,
			count: specialist.length,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getClassTeachers(query: GetClassTeachersDto, classId: number): Promise<PaginationModel<Account>> {
		const queryProps = {
			isBlocked: query.isBlocked === undefined ? 0 : query.isBlocked === 'true' ? 1 : 2,
			word: query.word || '',
			limit: query.limit,
			page: query.page
		};

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});
		if (!cls) {
			throw new BadRequestException('!الصف غير موجود');
		}

		const { skip, take } = getPagination(queryProps.page, queryProps.limit);

		const [teacher, total] = await this.accountRepo.findAndCount({
			skip,
			take,
			where: {
				teacher: {
					classTeacher: {
						cls: {
							id: classId
						}
					}
				},
				profile: [
					{
						firstName: Like(`%${queryProps.word}%`)
					},
					{
						middleName: Like(`%${queryProps.word}%`)
					},
					{
						lastName: Like(`%${queryProps.word}%`)
					}
				],
				isBlocked: queryProps.isBlocked === 0 ? undefined : queryProps.isBlocked === 1
			},
			relations: ['profile'],
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: teacher,
			total: total,
			count: teacher.length,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getClassSpecialists(query: GetClassSpecialistsDto, classId: number): Promise<PaginationModel<Account>> {
		const queryProps = {
			isBlocked: query.isBlocked === undefined ? 0 : query.isBlocked === 'true' ? 1 : 2,
			word: query.word || '',
			limit: query.limit,
			page: query.page
		};

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});
		if (!cls) {
			throw new BadRequestException('!الصف غير موجود');
		}

		const { skip, take } = getPagination(query.page, query.limit);

		const [specialist, total] = await this.accountRepo.findAndCount({
			skip,
			take,
			where: {
				specialist: {
					classSpecialist: {
						cls: {
							id: classId
						}
					}
				},
				profile: [
					{
						firstName: Like(`%${queryProps.word}%`)
					},
					{
						middleName: Like(`%${queryProps.word}%`)
					},
					{
						lastName: Like(`%${queryProps.word}%`)
					}
				],
				isBlocked: queryProps.isBlocked === 0 ? undefined : queryProps.isBlocked === 1
			},
			relations: ['profile'],
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: specialist,
			total: total,
			count: specialist.length,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getClassChilds(query: GetClassChildsDto, classId: number): Promise<PaginationModel<Account>> {
		const queryProps = {
			isBlocked: query.isBlocked === undefined ? 0 : query.isBlocked === 'true' ? 1 : 2,
			word: query.word || '',
			limit: query.limit,
			page: query.page
		};

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});
		if (!cls) {
			throw new BadRequestException('!الصف غير موجود');
		}

		const { skip, take } = getPagination(query.page, query.limit);

		const [child, total] = await this.accountRepo.findAndCount({
			skip,
			take,
			where: {
				child: {
					classChild: {
						cls: {
							id: classId
						}
					}
				},
				profile: [
					{
						firstName: Like(`%${queryProps.word}%`)
					},
					{
						middleName: Like(`%${queryProps.word}%`)
					},
					{
						lastName: Like(`%${queryProps.word}%`)
					}
				],
				isBlocked: queryProps.isBlocked === 0 ? undefined : queryProps.isBlocked === 1
			},
			relations: ['profile', 'child', 'child.classChild', 'child.classChild.cls', 'child.childNeedLevel'],
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: child,
			total: total,
			count: child.length,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async addChildToClass(accountId: number, classId: number, account: Account) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: accountId
				}
			},
			relations: ['account']
		});
		if (!child) {
			throw new NotFoundException('!الحساب غير موجود');
		}
		if (child.account.isBlocked) {
			throw new NotFoundException('!الحساب محظور');
		}

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});
		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		let classChild = await this.classChildRepo.findOne({
			where: {
				child: {
					id: child.id
				}
			},
			relations: ['createdBy', 'cls'],
			withDeleted: true
		});

		if (!classChild) {
			classChild = this.classChildRepo.create({
				child: {
					id: child.id
				},
				cls: {
					id: classId
				},
				createdBy: {
					id: account.id
				}
			});
		} else if (classChild.deletedAt) {
			classChild.deletedAt = null;
			classChild.cls.id = classId;
			classChild.createdBy.id = account.id;
		} else {
			throw new BadRequestException('!هذاالطفل موجود بالفعل في الصف');
		}

		await this.classChildRepo.save(classChild);

		return null;
	}

	async removeChildFromClass(accountId: number, classId: number) {
		const child = await this.childRepo.findOne({
			where: {
				account: {
					id: accountId
				}
			},
			relations: ['classChild', 'classChild.cls', 'account']
		});

		if (!child) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});

		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		if (child.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		if (!child.classChild || child.classChild.cls.id !== classId) {
			throw new BadRequestException('!الطفل غير موجود في هذاالصف');
		}

		await this.classChildRepo.softDelete({
			cls: {
				id: classId
			},
			child: {
				id: child.id
			}
		});

		return null;
	}

	async assignTeacherToClass(accountId: number, classId: number, account: Account) {
		const teacher = await this.teacherRepo.findOne({
			where: {
				account: {
					id: accountId
				}
			},
			relations: ['classTeacher', 'classTeacher.cls', 'account']
		});

		if (!teacher) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});

		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		if (teacher.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		const classTeacher = teacher.classTeacher.filter((classTeacher) => classTeacher.cls.id === classId);

		if (classTeacher.length === 1) {
			throw new BadRequestException('!هذاالمعلم معين في هذاالصف مسبقا');
		}

		await this.classTeacherRepo.save(
			this.classTeacherRepo.create({
				teacher: {
					id: teacher.id
				},
				cls: {
					id: classId
				},
				createdBy: {
					id: account.id
				}
			})
		);

		return null;
	}

	async unassignTeacherFromClass(accountId: number, classId: number) {
		const teacher = await this.teacherRepo.findOne({
			where: {
				account: {
					id: accountId
				}
			},
			relations: ['classTeacher', 'classTeacher.cls', 'account']
		});

		if (!teacher) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});

		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		if (teacher.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		const classTeacher = teacher.classTeacher.filter((classTeacher) => classTeacher.cls.id === classId);

		if (classTeacher.length === 0) {
			throw new BadRequestException('!لم يتم تعيين المعلم في هذاالصف');
		}

		await this.classTeacherRepo.softDelete({
			cls: {
				id: classId
			},
			teacher: {
				id: teacher.id
			}
		});

		return null;
	}

	async assignSpecialistToClass(accountId: number, classId: number, account: Account) {
		const specialist = await this.specialistRepo.findOne({
			where: {
				account: {
					id: accountId
				}
			},
			relations: ['classSpecialist', 'classSpecialist.cls', 'account']
		});

		if (!specialist) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});

		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		if (specialist.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		const classSpecialist = specialist.classSpecialist.filter((classSpecialist) => classSpecialist.cls.id === classId);

		if (classSpecialist.length === 1) {
			throw new BadRequestException('!هذاالأخصائي معين في هذاالصف مسبقا');
		}

		await this.classSpecialistRepo.save(
			this.classSpecialistRepo.create({
				specialist: {
					id: specialist.id
				},
				cls: {
					id: classId
				},
				createdBy: {
					id: account.id
				}
			})
		);

		return null;
	}

	async unassignSpecialistFromClass(accountId: number, classId: number) {
		const specialist = await this.specialistRepo.findOne({
			where: {
				account: {
					id: accountId
				}
			},
			relations: ['classSpecialist', 'classSpecialist.cls', 'account']
		});

		if (!specialist) {
			throw new NotFoundException('!الحساب غير موجود');
		}

		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			}
		});

		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}

		if (specialist.account.isBlocked) {
			throw new NotFoundException('!هذا الحساب محظور');
		}

		const classSpecialist = specialist.classSpecialist.filter((classSpecialist) => classSpecialist.cls.id === classId);

		if (classSpecialist.length === 0) {
			throw new BadRequestException('!لم يتم تعيين الأخصائي في هذا الصف');
		}

		await this.classSpecialistRepo.softDelete({
			cls: {
				id: classId
			},
			specialist: {
				id: specialist.id
			}
		});

		return null;
	}

	async getClassesOfTeacher(query: GetTeacherClassesDto, accountId: number): Promise<PaginationModel<Class>> {
		const queryProps = {
			word: query.word || '',
			limit: query.limit,
			page: query.page
		};

		const { skip, take } = getPagination(queryProps.page, queryProps.limit);
		const [cls, total] = await this.classRepo.findAndCount({
			skip,
			take,
			where: {
				classTeacher: {
					teacher: {
						account: {
							id: accountId
						}
					}
				},
				name: Like(`%${query.word || ''}%`),
				level: Like(`%${query.level || ''}%`)
			},
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: cls,
			total: total,
			count: cls.length,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getClassesOfSpecialist(query: GetSpecialistClassesDto, accountId: number): Promise<PaginationModel<Class>> {
		const queryProps = {
			word: query.word || '',
			limit: query.limit,
			page: query.page
		};

		const { skip, take } = getPagination(queryProps.page, queryProps.limit);
		const [cls, total] = await this.classRepo.findAndCount({
			skip,
			take,
			where: {
				classSpecialist: {
					specialist: {
						account: {
							id: accountId
						}
					}
				},
				name: Like(`%${query.word || ''}%`),
				level: Like(`%${query.level || ''}%`)
			},
			order: {
				updatedAt: 'DESC'
			}
		});

		return {
			data: cls,
			total: total,
			count: cls.length,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async deleteClass(classId: number) {
		const cls = await this.classRepo.findOne({
			where: {
				id: classId
			},
			relations: ['classChild', 'classSpecialist', 'classTeacher']
		});

		if (!cls) {
			throw new NotFoundException('!الصف غير موجود');
		}
		await this.classRepo.softRemove(cls);

		return null;
	}

	async getChildUnassignedToClass(query: GetChildUnassignedToClassDto): Promise<PaginationModel<Account>> {
		// NOTE: hard coded pagination and route

		const queryProps = {
			word: query.word || '',
			limit: query.limit || 10,
			page: query.page || 0,
			isBlocked: query.isBlocked === undefined ? 0 : query.isBlocked === 'true' ? 1 : 2
		};

		const accounts = await this.accountRepo.find({
			where: {
				accountType: 'child',
				profile: [
					{
						firstName: Like(`%${queryProps.word}%`)
					},
					{
						middleName: Like(`%${queryProps.word}%`)
					},
					{
						lastName: Like(`%${queryProps.word}%`)
					}
				],
				isBlocked: queryProps.isBlocked === 0 ? undefined : queryProps.isBlocked === 1
			},
			relations: ['profile', 'child', 'child.classChild', 'child.childNeedLevel']
		});

		const unassignedAccounts = accounts.filter((account) => !account.child.classChild);
		const result = unassignedAccounts.slice(
			queryProps.page * queryProps.limit,
			(queryProps.page + 1) * queryProps.limit - 1
		);

		return {
			data: result,
			total: unassignedAccounts.length,
			count: result.length,
			page: query.page,
			pageCount: Math.floor((unassignedAccounts.length + queryProps.limit - 1) / queryProps.limit)
		};
	}
}
