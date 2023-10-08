import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ExternalCenterTask } from './external-center-task.entity';
import { ChildCenterTaskPerformance } from '../enums';
import { Child } from '../../../account-management';

@Entity()
export class ExternalCenterTaskLog {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(ChildCenterTaskPerformance),
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
	@ManyToOne(() => Child, (child) => child.externalCenterTaskLog)
	child!: Child;

	@Expose()
	@ManyToOne(() => ExternalCenterTask, (externalCenterTask) => externalCenterTask.externalCenterTaskLog)
	externalCenterTask!: ExternalCenterTask;
}
