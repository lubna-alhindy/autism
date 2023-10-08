import {
	Entity,
	OneToOne,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Child } from '../../../account-management';
import { Program } from './program.entity';

@Entity()
export class ProgramChild {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@OneToOne(() => Child, (child) => child.programChild)
	@JoinColumn()
	child!: Child;

	@ManyToOne(() => Program, (program) => program.programChild)
	program!: Program;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date | null;
}
