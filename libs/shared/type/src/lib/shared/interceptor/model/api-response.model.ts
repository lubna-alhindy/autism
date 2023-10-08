export class ApiResponseModel<T> {
	statusCode!: number;
	messages!: string[];
	data!: T;
}
