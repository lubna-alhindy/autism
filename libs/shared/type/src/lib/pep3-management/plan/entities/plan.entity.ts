import {
	Entity,
	Column,
	OneToOne,
	ManyToOne,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management';
import { Pep3Test } from '../../../pep3-management';
import { Goal } from './goal.entity';

@Entity()
export class Plan {
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

	@ManyToOne(() => Child, (child) => child.plan)
	child!: Child;

	@Expose()
	@OneToMany(() => Goal, (goal) => goal.plan, {
		onDelete: 'CASCADE',
		cascade: ['soft-remove']
	})
	goal!: Goal[];

	@Expose()
	@OneToOne(() => Pep3Test, (pep3Test) => pep3Test.plan)
	@JoinColumn()
	pep3Test!: Pep3Test;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
