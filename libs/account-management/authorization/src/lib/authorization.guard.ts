import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RolePermission } from '@autism/shared/type';

const globalRoutes = ['/account/login'];

@Injectable()
export class AuthorizationGuard implements CanActivate {
	constructor(
		@InjectRepository(RolePermission)
		private rolePermissionRepo: Repository<RolePermission>
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const route = req.route.path;
		const method = req.method;

		if (globalRoutes.includes(route)) {
			return true;
		}
		if (!req.user) {
			return false;
		}

		const rolePermission = await this.rolePermissionRepo.findOneBy({
			permission: {
				name: route,
				method: method
			},
			role: {
				name: req.user.sub.accountType
			}
		});

		return !rolePermission ? false : true;
	}
}
