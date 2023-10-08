import { ClassConstructor } from 'class-transformer';
import { UseInterceptors } from '@nestjs/common';

import { SerializeInterceptor } from '@autism/shared/interceptor';

export function Serialize<T>(dto: ClassConstructor<T>) {
	return UseInterceptors(new SerializeInterceptor(dto));
}
