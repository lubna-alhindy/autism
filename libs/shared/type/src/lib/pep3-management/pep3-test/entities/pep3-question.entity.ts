import { Column, Entity, OneToMany, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Pep3Domain } from './pep3-domain.entity';
import { Pep3Answer } from './pep3-answer.entity';

@Entity()
export class Pep3Question {
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
	question!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '512',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	goal!: string;

	@Expose()
	@ManyToOne(() => Pep3Domain, (pep3Domain) => pep3Domain.pep3Question)
	pep3Domain!: Pep3Domain;

	@Expose()
	@OneToMany(() => Pep3Answer, (pep3Answer) => pep3Answer.pep3Question)
	pep3Answer!: Pep3Answer[];

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;
}
