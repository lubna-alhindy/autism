import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management';

@Entity()
export class FamilyNote {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '512',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	note!: string;

	@ManyToOne(() => Child, (child) => child.familyNote)
	child!: Child;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
