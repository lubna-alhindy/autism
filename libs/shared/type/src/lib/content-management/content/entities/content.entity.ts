import { Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, Column } from 'typeorm';
import { Expose } from 'class-transformer';

import { splitEnum } from '@autism/shared/util';

import { ContentType } from '../enum/content-type.enum';

@Entity()
export class Content {
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
	mediaRowId!: number;

	@Expose()
	@Column({
		type: 'enum',
		enum: splitEnum(ContentType),
		nullable: false
	})
	contentType!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
