import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Content } from '../../../content-management';

@Entity()
export class Matching {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Content)
	mainContent!: Content;

	@Expose()
	@ManyToOne(() => Content)
	content1!: Content;

	@Expose()
	@ManyToOne(() => Content)
	content2!: Content;

	@Expose()
	@ManyToOne(() => Content)
	content3!: Content;

	@Expose()
	@Column({
		nullable: false
	})
	answer!: number;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
