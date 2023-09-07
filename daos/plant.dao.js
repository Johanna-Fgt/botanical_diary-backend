import User from '../models/user.model.js';
import { TaskDAO } from './task.dao.js';
// import { FileUtils } from '../utils/file.utils.js';
import { getCurrentDate } from '../utils/date.utils.js';
import { log, logError } from '../utils/logger.utils.js';
import { DEFAULT_PICTURE, DEFAULT_ROOM } from '../utils/constants.utils.js';
import cloudinary from 'cloudinary';
// import { DEFAULT_IMG_PATH } from '../utils/upload.utils.js';

//return [plants]
const getAll = async (userId) => {
	try {
		const user = await User.findById(userId).exec();
		return !user ? null : user.plants;
	} catch (err) {
		logError(`${getCurrentDate()} - plant.dao - getAll : ${err.message}. `);
		return null;
	}
};

//return {plant}
const getOne = async (userId, plantId) => {
	try {
		const user = await User.findById(userId);
		const plant = user.plants.id(plantId);

		return !user ? null : plant;
	} catch (err) {
		logError(`${getCurrentDate()} - plant.dao - getOne : ${err.message}. `);
		return null;
	}
};

//return created {plant}
const create = async (userId, newPlant) => {
	try {
		const user = await User.findById(userId);

		//PlantName must be unique
		if (
			user.plants.find(
				(p) => p.plantName.toLowerCase() === newPlant.plantName.toLowerCase()
			)
		) {
			return null;
		}

		newPlant.img = newPlant.img || DEFAULT_PICTURE;
		newPlant.room = newPlant.room || DEFAULT_ROOM;

		user.plants.push(newPlant);

		const updatedUser = await user.save();
		log(
			'New plant : ' +
				updatedUser.plants[updatedUser.plants.length - 1].plantName
		);
		return !updatedUser
			? null
			: updatedUser.plants[updatedUser.plants.length - 1];
	} catch (err) {
		logError(`${getCurrentDate()} - plant.dao - create : ${err.message}. `);
		return null;
	}
};

//return {plant} with it's new image
// const createImage = async (userId, plantId, img) => {
// 	try {
// 		const user = await User.findById(userId);
// 		const plant = user.plants.id(plantId);

// 		plant.img = img;

// 		const updatedUser = await user.save();

// 		return !updatedUser ? null : updatedUser.plants.id(plantId);
// 	} catch (err) {
// 		logError(
// 			`${getCurrentDate()} - plant.dao - createImage : ${err.message}. `
// 		);
// 		return null;
// 	}
// };

//return updated {plant}
const updateOne = async (userId, plantId, plantDatas) => {
	try {
		const user = await User.findById(userId);
		const plant = user.plants.id(plantId);
		const keys = Object.keys(plantDatas);

		keys.forEach((key) => {
			plant[key] = plantDatas[key];
		});

		const updatedUser = await user.save();

		log('Updated plant :' + updatedUser.plants.id(plantId).plantName);

		return !updatedUser ? null : updatedUser.plants.id(plantId);
	} catch (err) {
		logError(`${getCurrentDate()} - plant.dao - updateOne : ${err.message}. `);
		return null;
	}
};

//return {plant} with it's new image
// const updateImage = async (userId, plantId, img) => {
// 	try {
// 		const user = await User.findById(userId);
// 		const plant = user.plants.id(plantId);

// 		// 🚨delete img from folder
// 		if (plant.img !== DEFAULT_IMG_PATH)
// 			await FileUtils.removeUserPlantFile(userId, plant.img);

// 		plant.img = img;

// 		const updatedUser = await user.save();

// 		return !updatedUser ? null : updatedUser.plants.id(plantId);
// 	} catch (err) {
// 		logError(
// 			`${getCurrentDate()} - plant.dao - updateImage : ${err.message}. `
// 		);
// 		return null;
// 	}
// };

//return updated user with all datas
const deleteOne = async (userId, plantId) => {
	try {
		const user = await User.findById(userId);
		const plant = user.plants.id(plantId);

		//🚨 remove plant from tasks if exists
		const waterTask = user.tasks.watering.find(
			(w) => w.plantName.toLowerCase() === plant.plantName.toLowerCase()
		);

		const fertTask = user.tasks.fertilization.find(
			(w) => w.plantName.toLowerCase() === plant.plantName.toLowerCase()
		);

		const repotTask = user.tasks.repotting.find(
			(w) => w.plantName.toLowerCase() === plant.plantName.toLowerCase()
		);

		if (waterTask) await TaskDAO.deleteOne(userId, waterTask.id);
		if (fertTask) await TaskDAO.deleteOne(userId, fertTask.id);
		if (repotTask) await TaskDAO.deleteOne(userId, repotTask.id);

		// 🚨delete img from user's folder
		const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
		const plantPublicId = plant.img.match(regex);
		const defaultPublicId = DEFAULT_PICTURE.match(regex);
		plantPublicId !== defaultPublicId &&
			cloudinary.v2.api
				.delete_resources([publicId[1]], {
					type: 'upload',
					resource_type: 'image',
				})
				.then(console.log);
		// if (plant.img !== DEFAULT_IMG_PATH)
		// await FileUtils.removeUserPlantFile(userId, plant.img);

		plant.remove();

		const updatedUser = await user.save();

		return !updatedUser || updatedUser.plants.id(plantId) ? null : updatedUser;
	} catch (err) {
		logError(`${getCurrentDate()} - plant.dao - deleteOne : ${err.message}. `);
		return null;
	}
};

export const PlantDAO = {
	getAll,
	getOne,
	create,
	// createImage,
	updateOne,
	// updateImage,
	deleteOne,
};
