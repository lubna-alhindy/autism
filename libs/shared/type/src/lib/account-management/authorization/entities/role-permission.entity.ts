import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
export class RolePermission {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Role, (role) => role.rolePermission)
	role!: Role;

	@Expose()
	@ManyToOne(() => Permission, (permission) => permission.rolePermission)
	permission!: Permission;
}
