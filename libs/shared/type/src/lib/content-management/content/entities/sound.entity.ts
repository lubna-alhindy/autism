import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, DeleteDateColumn } from 'typeorm';
import { Expose } from 'class-transformer';

@Entity()
export class Sound {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@Column({
		type: 'varchar',
		length: 1024
	})
	url!: string;

	@Expose()
	@CreateDateColumn()
	createdAt!: Date;
	
	@DeleteDateColumn()
	deletedAt!: Date;
}
