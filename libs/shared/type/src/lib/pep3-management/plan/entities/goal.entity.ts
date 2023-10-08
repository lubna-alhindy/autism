import {
	Entity,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { Evaluation } from '../../../pep3-management/pep3-test/enum';
import { Pep3Question } from '../../pep3-test';
import { Plan } from './plan.entity';
import { Technique } from '../enum';

@Entity()
export class Goal {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(Technique),
		nullable: true
	})
	technique!: string | null;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(Evaluation),
		nullable: false,
		default: 'not evaluated'
	})
	evaluation!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '512',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	note!: string | null;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '512',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	motivation!: string | null;

	@ManyToOne(() => Plan, (plan) => plan.goal)
	plan!: Plan;

	@ManyToOne(() => Pep3Question)
	pep3Question!: Pep3Question;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
