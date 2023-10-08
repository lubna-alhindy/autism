import {
	Injectable,
	CallHandler,
	NestInterceptor,
	ExecutionContext,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Account } from '@autism/shared/type';

@Injectable()
export class IsBlockedInterceptor implements NestInterceptor {
	constructor(
		@InjectRepository(Account)
		private accountRepository: Repository<Account>
	) {}

	async intercept(context: ExecutionContext, next: CallHandler) {
		const excludeRoute = ['/account/login'];
		const incomingRoute = context.switchToHttp().getRequest().originalUrl;

		if (excludeRoute.includes(incomingRoute)) {
			return next.handle();
		}

		const user: Account = context.switchToHttp().getRequest().user?.sub;
		if (!user) {
			throw new UnauthorizedException('!يرجى القيام بعملية تسجيل دخول');
		}

		const account = await this.accountRepository.findOneBy({
			id: user.id
		});
		if (!account) {
			throw new NotFoundException('!هذا الحساب غير موجود');
		}
		if (account.isBlocked) {
			throw new UnauthorizedException('!هذا الحساب معطل حاليا');
		}

		return next.handle();
	}
}
