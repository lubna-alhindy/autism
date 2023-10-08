import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { ProfileOfDevelopmentalAge } from './profile-of-developmental-age.entity';
import { Pep3Question } from './pep3-question.entity';
import { Pep3Age } from './pep3-age.entity';

@Entity()
export class Pep3Domain {
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
		unique: true,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	domain!: string;

	@Expose()
	@OneToMany(() => Pep3Question, (pep3Question) => pep3Question.pep3Domain)
	pep3Question!: Pep3Question[];

	@Expose()
	@OneToMany(() => Pep3Age, (pep3Age) => pep3Age.pep3Domain)
	pep3Age!: Pep3Age[];

	@Expose()
	@OneToMany(() => ProfileOfDevelopmentalAge, (profileOfDevelopmentalAge) => profileOfDevelopmentalAge.pep3Domain)
	profileOfDevelopmentalAge!: ProfileOfDevelopmentalAge[];

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;
}
