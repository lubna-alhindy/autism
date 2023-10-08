import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, Unique, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Pep3Domain } from './pep3-domain.entity';
import { Pep3Test } from './pep3-test.entity';

@Entity()
@Unique(['pep3Test.id', 'pep3Domain.id'])
export class Pep3Age {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Pep3Test, (pep3Test) => pep3Test.pep3Age)
	pep3Test!: Pep3Test;

	@Expose()
	@ManyToOne(() => Pep3Domain, (pep3Domain) => pep3Domain.pep3Age)
	pep3Domain!: Pep3Domain;

	@Column({
		nullable: false,
		type: 'int'
	})
	age!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
