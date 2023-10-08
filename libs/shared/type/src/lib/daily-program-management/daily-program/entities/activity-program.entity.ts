import { DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { Activity } from './activity.entity';
import { Program } from './program.entity';

@Entity()
export class ActivityProgram {
	@Expose()
	@PrimaryGeneratedColumn({
		type: 'int'
	})
	id!: number;

	@Expose()
	@ManyToOne(() => Program, (program) => program.activityProgram)
	program!: Program;

	@Expose()
	@ManyToOne(() => Activity, (activity) => activity.activityProgram)
	activity!: Activity;

	@DeleteDateColumn()
	deletedAt!: Date;
}
