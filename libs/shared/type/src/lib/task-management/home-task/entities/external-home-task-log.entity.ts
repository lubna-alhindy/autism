import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ChildHomeTaskPerformance } from '../enums';
import { Child } from '../../../account-management';
import { ExternalHomeTask } from './external-home-task.entity';

@Entity()
export class ExternalHomeTaskLog {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(ChildHomeTaskPerformance),
		nullable: false,
		default: 'not evaluated'
	})
	childPerformance!: string;

	@Expose()
	@Column({
		nullable: true,
		type: 'varchar',
		length: '512',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	note!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@ManyToOne(() => Child, (child) => child.externalHomeTaskLog)
	child!: Child;

	@Expose()
	@ManyToOne(() => ExternalHomeTask, (externalHomeTask) => externalHomeTask.externalHomeTaskLog)
	externalHomeTask!: ExternalHomeTask;
}
