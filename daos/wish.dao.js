import User from '../models/user.model.js';
import { getCurrentDate } from '../utils/date.utils.js';
import { log, logError } from '../utils/logger.utils.js';

//return [wishPlants] from one user
const readAll = async (userId) => {
	try {
		const user = await User.findById(userId).exec();
		//DELETE ALL FOR TESTS ONLY
		// user.wishPlants = [];
		// await user.save();
		return !user ? null : user.wishPlants;
	} catch (err) {
		logError(`${getCurrentDate()} - wish.dao - readAll : ${err.message}. `);
		return null;
	}
};

//return only wish created
const create = async (userId, wish) => {
	try {
		const user = await User.findById(userId);

		user.wishPlants.push({ ...wish, plantName: wish.plantName });

		const updatedUser = await user.save();

		log(
			'New wish : ' + updatedUser.wishPlants[updatedUser.wishPlants.length - 1]
		);

		return !updatedUser
			? null
			: updatedUser.wishPlants[updatedUser.wishPlants.length - 1];
	} catch (err) {
		logError(`${getCurrentDate()} - wish.dao - create : ${err.message}. `);
		return null;
	}
};

//return deleted wish's id
const deleteOne = async (userId, wishId) => {
	try {
		const user = await User.findById(userId);

		user.wishPlants.id(wishId).remove();

		const updatedUser = await user.save();

		return !updatedUser || updatedUser.wishPlants.id(wishId)
			? null
			: updatedUser;
	} catch (err) {
		logError(`${getCurrentDate()} - wish.dao - deleteOne : ${err.message}. `);
		return null;
	}
};

export const WishDAO = {
	readAll,
	create,
	deleteOne,
};
