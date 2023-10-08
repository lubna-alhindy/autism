import { writeFileSync , existsSync ,mkdirSync } from 'fs';
import { join } from 'path';

export const writeAssetFile = (folder: string, filename: string, file: Buffer) => {
	if( !existsSync(join(__dirname, 'assets', folder)) ){
		mkdirSync(join(__dirname, 'assets', folder));
	}
	writeFileSync(join(__dirname, 'assets', folder, filename), file);
};
