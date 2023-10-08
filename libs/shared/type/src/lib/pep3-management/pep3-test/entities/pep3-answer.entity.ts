import { Entity, Column, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { Pep3Question } from './pep3-question.entity';
import { Evaluation } from '../enum/evaluation';
import { Pep3Test } from './pep3-test.entity';

@Entity()
export class Pep3Answer {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(Evaluation),
		nullable: false
	})
	evaluation!: string;

	@Expose()
	@ManyToOne(() => Pep3Question, (pep3Question) => pep3Question.pep3Answer)
	pep3Question!: Pep3Question;

	@Expose()
	@ManyToOne(() => Pep3Test, (pep3Test) => pep3Test.pep3Answer)
	pep3Test!: Pep3Test;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
