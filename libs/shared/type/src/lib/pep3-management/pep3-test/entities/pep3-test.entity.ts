import {
	Entity,
	Column,
	OneToOne,
	ManyToOne,
	OneToMany,
	DeleteDateColumn,
	CreateDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management/account';
import { Pep3Answer } from './pep3-answer.entity';
import { Pep3Age } from './pep3-age.entity';
import { Plan } from '../../plan';

@Entity()
export class Pep3Test {
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
	name!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '512',
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	bodyDescription!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '512',
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	behaviorDescription!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@OneToMany(() => Pep3Age, (pep3Age) => pep3Age.pep3Test, {
		onDelete: 'CASCADE',
		cascade: ['soft-remove']
	})
	pep3Age!: Pep3Age[];

	@Expose()
	@OneToMany(() => Pep3Answer, (pep3Answer) => pep3Answer.pep3Test, {
		onDelete: 'CASCADE',
		cascade: ['soft-remove']
	})
	pep3Answer!: Pep3Answer[];

	@Expose()
	@OneToOne(() => Plan, (plan) => plan.pep3Test, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	plan!: Plan;

	@ManyToOne(() => Child, (child) => child.pep3Test)
	child!: Child;

	@Expose()
	currentDomainId?: number | null;
}
