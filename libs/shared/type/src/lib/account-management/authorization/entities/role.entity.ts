import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { RolePermission } from './role-permission.entity';

@Entity()
export class Role {
	@Expose()
	@PrimaryColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64',
		unique: true
	})
	name!: string;

	@Expose()
	@OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
	rolePermission!: RolePermission;
}
