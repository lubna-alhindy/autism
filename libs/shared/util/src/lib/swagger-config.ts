import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerConfig = (app: INestApplication) => {
	SwaggerModule.setup(
		'api',
		app,
		SwaggerModule.createDocument(
			app,
			new DocumentBuilder()
				.setTitle('API Documentation')
				.setDescription('The API docs for autism-backend project')
				.setVersion('1.0')
				.addBearerAuth(
					{
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
						name: 'JWT',
						description: 'Enter JWT token',
						in: 'header'
					},
					'access-token'
				)
				.build(),
			{
				operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
			}
		),
		{
			swaggerOptions: {
				apisSorter: 'alpha',
				operationsSorter: 'alpha',
				tagsSorter: 'alpha'
			}
		}
	);
};
