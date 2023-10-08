import { json, urlencoded, static as expressStatic } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CrudConfigService } from '@rewiko/crud';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { swaggerConfig } from '@autism/shared/util';

CrudConfigService.load({
	query: {
		alwaysPaginate: true,
		maxLimit: 100
	}
});

import { AppModule } from './app/app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(
		json({
			limit: '50mb'
		})
	);

	app.use(
		urlencoded({
			limit: '50mb',
			extended: true
		})
	);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true
		})
	);

	app.enableCors({
		allowedHeaders: '*',
		origin: (_, callback) => {
			callback(null, true);
		}
	});

	app.use('/static-file/content', expressStatic(join(__dirname, 'assets', 'content')));
	app.use('/static-file/profile-image', expressStatic(join(__dirname, 'assets', 'profile-image')));

	swaggerConfig(app);

	const port = 4000;
	await app.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
