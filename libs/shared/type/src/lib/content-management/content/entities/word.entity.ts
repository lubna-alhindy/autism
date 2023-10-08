import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class Word {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		charset: 'utf8',
		collation: 'utf8_general_ci',
		type: 'varchar',
		length: 256
	})
	word!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
