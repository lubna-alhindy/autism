import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import {
	Account,
	Message,
	GetOneChatDto,
	GetManyChatDto,
	PaginationModel,
	CreateMessageDto,
	GetManyChatModel
} from '@autism/shared/type';
import { getPagination } from '@autism/shared/util';

@Injectable()
export class CommunicationService {
	constructor(
		@InjectRepository(Account) private accountRepo: Repository<Account>,
		@InjectRepository(Message) private messageRepo: Repository<Message>
	) {}

	async getOneChat(query: GetOneChatDto, otherAccountId: number, account: Account) {
		const { skip, take } = getPagination(query.page, query.limit);

		const otherAccount = await this.accountRepo.findOneBy({
			id: otherAccountId
		});
		if (!otherAccount) {
			throw new NotFoundException('!هذا الحساب غير موجود');
		}

		const [messages, total] = await this.messageRepo.findAndCount({
			skip,
			take,
			where: [
				{
					sender: {
						id: account.id
					},
					receiver: {
						id: otherAccountId
					}
				},
				{
					sender: {
						id: otherAccountId
					},
					receiver: {
						id: account.id
					}
				}
			],
			order: {
				createdAt: 'DESC'
			},
			relations: ['sender', 'receiver']
		});

		await this.messageRepo.update(
			{
				sender: {
					id: otherAccountId
				},
				receiver: {
					id: account.id
				}
			},
			{ isRead: true }
		);

		return {
			data: messages,
			count: messages.length,
			total: total,
			page: query.page,
			pageCount: Math.floor((total + take - 1) / take)
		};
	}

	async getManyChat(query: GetManyChatDto, account: Account): Promise<PaginationModel<GetManyChatModel>> {
		const { skip, take } = getPagination(query.page, query.limit);

		const [chats, total] = await this.accountRepo.findAndCount({
			skip,
			take,
			where: [
				{
					id: Not(account.id),
					sentMessage: [
						{
							sender: {
								id: account.id
							}
						},
						{
							receiver: {
								id: account.id
							}
						}
					]
				},
				{
					id: Not(account.id),
					receivedMessage: [
						{
							sender: {
								id: account.id
							}
						},
						{
							receiver: {
								id: account.id
							}
						}
					]
				}
			],
			relations: ['profile']
		});

		const response: GetManyChatModel[] = await Promise.all(
			chats.map(async (chat) => {
				const messageCount = await this.messageRepo.count({
					where: {
						isRead: false,
						sender: {
							id: chat.id
						},
						receiver: {
							id: account.id
						}
					}
				});
				const res: GetManyChatModel = {
					count: messageCount,
					accounts: chat
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

	async createMessage(body: CreateMessageDto, otherAccountId: number, account: Account) {
		const otherAccount = await this.accountRepo.findOneBy({
			id: otherAccountId
		});
		if (!otherAccount) {
			throw new NotFoundException('!هذا الحساب غير موجود');
		}

		if (otherAccountId === account.id) {
			throw new NotFoundException('!لا يمكن إرسال رسالة لهاذ الحساب');
		}

		if (otherAccount.isBlocked) {
			throw new BadRequestException('!هذا الحساب محظور');
		}

		return await this.messageRepo.save(
			this.messageRepo.create({
				sender: {
					id: account.id
				},
				receiver: {
					id: otherAccountId
				},
				subject: body.subject,
				content: body.content
			})
		);
	}

	async getNumberOfUnreadMessage(account: Account) {
		const myAccount = await this.accountRepo.findOneBy({
			id: account.id
		});
		if (!myAccount) {
			throw new NotFoundException('!هذا الحساب غير موجود');
		}

		const numMessage = await this.messageRepo.count({
			where: {
				receiver: {
					id: account.id
				},
				isRead: false
			}
		});

		return numMessage;
	}
}
