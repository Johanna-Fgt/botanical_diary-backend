import User from '../models/user.model.js';
import { PlantDAO } from './plant.dao.js';
import { getCurrentDate } from '../utils/date.utils.js';
import { log, logError } from '../utils/logger.utils.js';

//return [graveyard] from one user
const readAll = async (userId) => {
	try {
		const user = await User.findById(userId).exec();
		return !user ? null : user.graveyard;
	} catch (err) {
		logError(`${getCurrentDate()} - grave.dao - readAll : ${err.message}. `);
		return null;
	}
};

//return only new ghost's name
const create = async (userId, deadPlantId) => {
	try {
		const user = await User.findById(userId);
		//find the plant in original list
		const deadPlant = user.plants.id(deadPlantId);

		//add the plant name to graveyard
		user.graveyard.push({ plantName: deadPlant.plantName });

		//remove the plant from original list and from tasks
		const plantIsDeleted = await PlantDAO.deleteOne(userId, deadPlantId);

		const updatedUser = await user.save();

		log(
			'New ghost : ' + updatedUser.graveyard[updatedUser.graveyard.length - 1]
		);

		return !plantIsDeleted || !updatedUser
			? null
			: updatedUser.graveyard[updatedUser.graveyard.length - 1];
	} catch (err) {
		logError(`${getCurrentDate()} - grave.dao - create : ${err.message}. `);
		return null;
	}
};

// return user
const deleteAll = async (userId) => {
	try {
		const user = await User.findById(userId);
		user.graveyard = [];
		const updatedUser = await user.save();

		return !updatedUser || updatedUser.graveyard.length > 0
			? null
			: updatedUser;
	} catch (err) {
		logError(`${getCurrentDate()} - grave.dao - deleteAll : ${err.message}. `);
		return null;
	}
};

export const GraveDAO = {
	readAll,
	create,
	deleteAll,
};
