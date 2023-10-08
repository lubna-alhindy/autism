import { NestInterceptor, ExecutionContext, CallHandler, Injectable } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
	constructor(private dto: ClassConstructor<T>) {}

	intercept(_context: ExecutionContext, next: CallHandler): Observable<T> {
		return next.handle().pipe(
			map((data: T) => {
				return plainToInstance(this.dto, data, {
					excludeExtraneousValues: true
				});
			})
		);
	}
}
