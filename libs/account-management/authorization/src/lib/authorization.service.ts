import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Permission, Role, RolePermission } from '@autism/shared/type';

@Injectable()
export class AuthorizationService {
	constructor(
		@InjectRepository(Role)
		private roleRepo: Repository<Role>,
		@InjectRepository(Permission)
		private permissionRepo: Repository<Permission>,
		@InjectRepository(RolePermission)
		private rolePermissionRepo: Repository<RolePermission>
	) {}

	async getIsAllowed(role: string) {
		const response = new Map<string, boolean>();
		await Promise.all(
			(
				await this.permissionRepo.find()
			).map((permission) => {
				response.set(permission.key, false);
			})
		);
		response.set('editProfile', true);

		const permissions = await this.permissionRepo.find({
			where: {
				rolePermission: {
					role: {
						name: role
					}
				}
			}
		});
		await Promise.all(
			permissions.map((permission) => {
				response.set(permission.key, true);
			})
		);

		return Object.fromEntries(response);
	}
}
