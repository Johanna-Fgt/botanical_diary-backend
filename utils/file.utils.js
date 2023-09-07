// import path from 'node:path';
// import fs from 'node:fs/promises';
// import { log, logError } from './logger.utils.js';
// import { UPLOAD_PATH } from './upload.utils.js';

// // const plants = '/plants/user/plant.jpg';
// // path.dirname(plants); // /plants/user
// // path.basename(plants); // plant.jpg
// // path.extname(plants); // .jpg

// //Création du repo s'il n'existe pas déjà
// const makeDir = async (path) => {
// 	try {
// 		await fs.access(path);
// 	} catch (err) {
// 		log('Try to create folder at ', path);
// 		await fs.mkdir(path, { recursive: true });
// 		log('Folder created');
// 	}
// };

// const moveFileOrCopy = async (oldPath, newPath) => {
// 	if (!oldPath || !newPath) throw new Error('nothing to move');
// 	await makeDir(path.dirname(newPath)); // /plants/user

// 	try {
// 		await fs.rename(oldPath, newPath);
// 	} catch (err) {
// 		if (err.code !== 'EXDEV') throw err;
// 		// Copy the file as a fallback
// 		await fs.copyFile(oldPath, newPath);
// 		// Remove the old file
// 		await fs.unlink(oldPath);
// 	}
// };

// const moveFile = async (oldPath, newPath) => {
// 	// const oldPath = "/path/to/file.txt";
// 	// const newPath = "/path/to/another/directory/file.txt";
// 	try {
// 		await moveFileOrCopy(oldPath, newPath);
// 		log('File moved successfully');
// 		return true;
// 	} catch (err) {
// 		logError(`file.utils - moveFile : ${err.message}`);
// 		return false;
// 	}
// };

// const removeFile = async (path) => {
// 	try {
// 		await fs.rm(path, { recursive: true, force: true });
// 	} catch (err) {
// 		logError(`file.utils - removeFile : ${err.message}`);
// 	}
// };

// const removeUserPlantFolder = async (id) =>
// 	await FileUtils.removeFile(`${UPLOAD_PATH}${id}`);

// const removeUserPlantFile = async (id, img) =>
// 	await FileUtils.removeFile(`${UPLOAD_PATH}${id}/${img}`);

// export const FileUtils = {
// 	makeDir,
// 	moveFile,
// 	removeFile,
// 	removeUserPlantFolder,
// 	removeUserPlantFile,
// };
