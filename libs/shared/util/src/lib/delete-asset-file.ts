import { unlinkSync } from 'fs';
import { join } from 'path';

export const deleteAssetFile = (folder: string, filename: string) => {
	unlinkSync(join(__dirname, 'assets', folder, filename));
};
