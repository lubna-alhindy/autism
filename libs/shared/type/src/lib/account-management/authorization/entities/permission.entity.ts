import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { RolePermission } from './role-permission.entity';

@Entity()
export class Permission {
	@Expose()
	@PrimaryColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '255'
	})
	name!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64'
	})
	method!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '255'
	})
	key!: string;

	@Expose()
	@OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
	rolePermission!: RolePermission;
}
