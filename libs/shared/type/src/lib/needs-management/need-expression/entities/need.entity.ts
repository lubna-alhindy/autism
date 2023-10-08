import {
	Entity,
	Column,
	OneToMany,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

import { Content } from '../../../content-management/content/entities/content.entity';
import { ChildNeedLog } from './child-need-log.entity';

@Entity()
export class Need {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'int',
		nullable: false
	})
	level!: number;

	@Expose()
	@ManyToOne(() => Content, {
		nullable: true
	})
	content!: Content;

	@Expose()
	@ManyToOne(() => Content)
	sound!: Content;

	@Expose()
	@ManyToOne(() => Need, (need) => need.children, {
		nullable: true
	})
	parent!: Need;

	@Expose()
	@OneToMany(() => Need, (need) => need.parent, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE',
		nullable: true
	})
	children!: Need[];

	@Expose()
	@OneToMany(() => ChildNeedLog, (childNeedLog) => childNeedLog.need, {
		cascade: ['soft-remove'],
		onDelete: 'CASCADE'
	})
	childNeedLog!: ChildNeedLog;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@Expose()
	@UpdateDateColumn()
	updatedAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
