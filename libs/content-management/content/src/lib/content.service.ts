import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
	Word,
	Image,
	Sound,
	Media,
	Content,
	GetOneContentModel,
	CreateWordContentDto,
	CreateImageContentDto,
	CreateSoundContentDto
} from '@autism/shared/type';
import { deleteAssetFile, writeAssetFile } from '@autism/shared/util';

@Injectable()
export class ContentService {
	constructor(
		private dataSource: DataSource,
		@InjectRepository(Word)
		private wordRepo: Repository<Word>,
		@InjectRepository(Image)
		private imageRepo: Repository<Image>,
		@InjectRepository(Sound)
		private soundRepo: Repository<Sound>,
		@InjectRepository(Content)
		private contentRepo: Repository<Content>
	) {}

	async getOneContent(id: number): Promise<GetOneContentModel> {
		const content = await this.contentRepo.findOne({
			where: {
				id: id
			}
		});

		if (!content) {
			throw new NotFoundException('!هذا المحتوى غير موجود في النظام');
		}

		let media: Media | null = null;
		if (content.contentType === 'image') {
			const image = await this.imageRepo.findOne({
				where: {
					id: content.mediaRowId
				}
			});
			if (!image) {
				throw new NotFoundException('!الصورة غير موجودة');
			}
			media = {
				id: image.id,
				url: image.url,
				word: null
			};
		} else if (content.contentType === 'word') {
			const word = await this.wordRepo.findOne({
				where: {
					id: content.mediaRowId
				}
			});
			if (!word) {
				throw new NotFoundException('!الكلمة غير موجودة');
			}
			media = {
				id: word.id,
				word: word.word,
				url: null
			};
		} else { // contentType = sound
			const sound = await this.soundRepo.findOne({
				where: {
					id: content.mediaRowId
				}
			});
			if (!sound) {
				throw new NotFoundException('!الصوت غير موجود');
			}
			media = {
				id: sound.id,
				url: sound.url,
				word: null
			};
		}

		const response: GetOneContentModel = {
			id: content.id,
			createdAt: content.createdAt,
			contentType: content.contentType,
			media: media
		};

		return response;
	}

	async createWordContent(body: CreateWordContentDto) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const word = await queryRunner.manager.save(
				this.wordRepo.create({
					word: body.word
				})
			);

			const content = await queryRunner.manager.save(
				this.contentRepo.create({
					mediaRowId: word.id,
					contentType: 'word'
				})
			);

			await queryRunner.commitTransaction();
			return content;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة المحتوى, ${error}`);
		}
	}

	async createImageContent(body: CreateImageContentDto) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			body.image.originalName = `${uuidv4()}-${body.image.originalName}`;
			writeAssetFile('content', body.image.originalName, body.image.buffer);

			const image = await queryRunner.manager.save(
				this.imageRepo.create({
					url: `static-file/content/${body.image.originalName}`
				})
			);

			const content = await queryRunner.manager.save(
				this.contentRepo.create({
					mediaRowId: image.id,
					contentType: 'image'
				})
			);

			await queryRunner.commitTransaction();
			return content;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة المحتوى, ${error}`);
		}
	}

	async createSoundContent(body: CreateSoundContentDto) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			body.sound.originalName = `${uuidv4()}-${body.sound.originalName}`;
			writeAssetFile('content', body.sound.originalName, body.sound.buffer);

			const sound = await queryRunner.manager.save(
				this.soundRepo.create({
					url: `static-file/content/${body.sound.originalName}`
				})
			);

			const content = await queryRunner.manager.save(
				this.contentRepo.create({
					mediaRowId: sound.id,
					contentType: 'sound'
				})
			);

			await queryRunner.commitTransaction();
			return content;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم إضافة المحتوى, ${error}`);
		}
	}

	async deleteContent(id: number) {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const content = await this.contentRepo.findOneBy({
				id: id
			});

			if (!content) {
				throw new NotFoundException('!المحتوى غير موجود');
			}

			if (content.contentType === 'image') {
				const image = await this.imageRepo.findOneBy({
					id: content.mediaRowId
				});
				if (!image) {
					throw new NotFoundException('!الصورة غير موجودة');
				}
				deleteAssetFile('content', image.url.split('static-file/content/')[1]);
				await queryRunner.manager.softRemove(image);
				await queryRunner.manager.softRemove(content);
			} else if (content.contentType === 'word') {
				const word = await this.wordRepo.findOneBy({
					id: content.mediaRowId
				});
				if (!word) {
					throw new NotFoundException('!الكلمة غير موجودة');
				}
				await queryRunner.manager.softRemove(word);
				await queryRunner.manager.softRemove(content);
			} else if (content.contentType === 'sound') {
				const sound = await this.soundRepo.findOneBy({
					id: content.mediaRowId
				});
				if (!sound) {
					throw new NotFoundException('!الصوت غير موجود');
				}
				deleteAssetFile('content', sound.url.split('static-file/content/')[1]);
				await queryRunner.manager.softRemove(sound);
				await queryRunner.manager.softRemove(content);
			}

			await queryRunner.commitTransaction();
			return null;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			throw new InternalServerErrorException(`!لم يتم حذف الصوت, ${error}`);
		}
	}

	async getSounds() {
		const content = await this.contentRepo.find({
			where: {
				contentType: 'sound'
			}
		});
		return await Promise.all(
			content.map(async (c) => {
				return await this.soundRepo.findOne({
					where: {
						id: c.mediaRowId
					}
				});
			})
		);
	}
}
