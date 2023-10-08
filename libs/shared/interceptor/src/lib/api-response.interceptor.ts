import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ApiResponseModel } from '@autism/shared/type';

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, ApiResponseModel<T>> {
	intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponseModel<T>> {
		return next.handle().pipe(
			catchError((error) => of(error)),
			map((data) => {
				if (!data || (!data.response && !data.errno && !data.message)) {
					return {
						statusCode: context.switchToHttp().getResponse().statusCode,
						messages: ['تمت العملية بنجاح'],
						data: data
					};
				}

				if (data.response) {
					console.error([data.response.message]);
					throw new HttpException(
						{
							statusCode: data.response.statusCode,
							messages: [data.response.message],
							data: null
						},
						data.response.statusCode
					);
				}

				if (data.errno) {
					console.error(['Database Error!', data.sql, data.sqlMessage]);
					throw new HttpException(
						{
							statusCode: 501,
							messages: ['Database Error!', data.sql, data.sqlMessage],
							data: null
						},
						501
					);
				}

				console.error([data.message]);
				throw new HttpException(
					{
						statusCode: 500,
						messages: [data.message],
						data: null
					},
					500
				);
			})
		);
	}
}
