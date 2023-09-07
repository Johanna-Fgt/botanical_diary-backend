import User from '../models/user.model.js';
import { logError } from '../utils/logger.utils.js';
import { formatUser } from '../utils/format.utils.js';
import { getCurrentDate } from '../utils/date.utils.js';

const create = async ({ name, email, password }) => {
	try {
		const user = new User({
			name,
			email,
			password,
		});
		const createdUser = await user.save();
		return createdUser ? formatUser(createdUser) : null;
	} catch (err) {
		logError(`${getCurrentDate()} - user.dao - create : ${err.messge}. `);
		return null;
	}
};

const getByEmail = async (email) => {
	try {
		const user = await User.findOne({
			email: { $regex: new RegExp(email, 'i') },
		}).exec();
		return user ? formatUser(user) : null;
	} catch (err) {
		logError(`${getCurrentDate()} - user.dao - getByEmail : ${err.messge}. `);
		return null;
	}
};

const getById = async (userId) => {
	try {
		const user = await User.findById(userId);
		return user ? formatUser(user) : null;
	} catch (err) {
		logError(`${getCurrentDate()} - user.dao - getById : ${err.message}. `);
		return null;
	}
};

const update = async (userId, data) => {
	try {
		const user = await User.findById(userId);

		user.name = data.name || user.name;
		user.theme = data.theme || user.theme;

		const updatedUser = await user.save();
		return !updatedUser ? null : updatedUser;
	} catch (err) {
		logError(`${getCurrentDate()} - user.dao - update : ${err.message}. `);
		return null;
	}
};

export const UserDAO = {
	create,
	getById,
	getByEmail,
	update,
};
