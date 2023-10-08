import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class NumberOrder {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		nullable: false,
		type: 'text'
	})
	numbers!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;

	@DeleteDateColumn()
	deletedAt!: Date;
}
