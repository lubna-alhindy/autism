import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Pep3Domain } from './pep3-domain.entity';

@Entity()
export class ProfileOfDevelopmentalAge {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Pep3Domain, (pep3Domain) => pep3Domain.profileOfDevelopmentalAge)
	pep3Domain!: Pep3Domain;

	@Column({
		nullable: false,
		type: 'int'
	})
	domainAge!: number;

	@Column({
		nullable: false,
		type: 'int'
	})
	ageInMonths!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;
}
