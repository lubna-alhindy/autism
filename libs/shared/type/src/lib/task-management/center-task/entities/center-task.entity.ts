import { Column, Entity, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ManyToOne, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ExternalCenterTask } from './external-center-task.entity';
import { InternalCenterTask } from './internal-center-task.entity';
import { ChildCenterTask } from './child-center-task.entity';
import { Teacher } from '../../../account-management';
import { CenterTaskType } from '../enums';

@Entity()
export class CenterTask {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(CenterTaskType),
		nullable: false
	})
	taskType!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'varchar',
		length: '64',
		unique: false,
		charset: 'utf8',
		collation: 'utf8_general_ci'
	})
	taskName!: string;

	@Expose()
	@Column({
		nullable: false,
		type: 'int'
	})
	sessionNumber!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;

	@Expose()
	@ManyToOne(() => Teacher, (teacher) => teacher.centerTask)
	teacher!: Teacher;

	@Expose()
	@OneToOne(() => ExternalCenterTask, (externalCenterTask) => externalCenterTask.centerTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	externalCenterTask!: ExternalCenterTask;

	@Expose()
	@OneToOne(() => InternalCenterTask, (internalCenterTask) => internalCenterTask.centerTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	internalCenterTask!: InternalCenterTask;

	@Expose()
	@OneToMany(() => ChildCenterTask, (childCenterTask) => childCenterTask.centerTask, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childCenterTask!: ChildCenterTask[];
}
