import { Expose, Type } from 'class-transformer';
import { Account } from '../../../account-management';


export class GetManyChatModel {
	@Expose()
	count!: number;

	@Expose()
	@Type(() => Account)
	accounts!: Account; 
}
