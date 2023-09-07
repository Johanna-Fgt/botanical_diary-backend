import User from '../models/user.model.js';
import { log, logError } from '../utils/logger.utils.js';
import { getCurrentDate } from '../utils/date.utils.js';

//return {task.watering, task.fertilization, task.repotting} from one user
const readAll = async (userId) => {
	try {
		const user = await User.findById(userId).exec();

		//TESTS - UNCOMMENT TO DELETE ALL tasks
		// user.tasks.watering = [];
		// const updatedUser = await user.save();
		// return !updatedUser ? null : updatedUser.tasks;

		return !user ? null : user.tasks;
	} catch (err) {
		logError(`${getCurrentDate()} - task.dao - readAll : ${err.message}. `);
		return null;
	}
};

//return only task created
const create = async (userId, taskList, task) => {
	try {
		const user = await User.findById(userId);

		if (
			!user.plants.find(
				(p) => p.plantName.toLowerCase() === task.plantName.toLowerCase()
			) ||
			!task.date ||
			!task.freq
		) {
			logError(
				`${getCurrentDate()} - task.dao - create : plant_not_found_or_incorrect_data`
			);
			return null;
		}

		const list =
			taskList === 'arrosage'
				? user.tasks.watering
				: taskList === 'fertilisation'
				? user.tasks.fertilization
				: user.tasks.repotting;

		list.push({ ...task });

		const updatedUser = await user.save();

		const createdTask =
			taskList === 'arrosage'
				? updatedUser.tasks.watering[updatedUser.tasks.watering.length - 1]
				: taskList === 'fertilisation'
				? updatedUser.tasks.fertilization[
						updatedUser.tasks.fertilization.length - 1
				  ]
				: updatedUser.tasks.repotting[updatedUser.tasks.repotting.length - 1];
		return !updatedUser ? null : createdTask;
	} catch (err) {
		logError(`${getCurrentDate()} - task.dao - create : ${err.message}. `);
		return null;
	}
};

//return updatedTask
const updateOne = async (userId, taskId, date, freq) => {
	try {
		const user = await User.findById(userId);
		const taskToUpdate =
			user.tasks.watering.id(taskId) ||
			user.tasks.fertilization.id(taskId) ||
			user.tasks.repotting.id(taskId);

		taskToUpdate.date = date;
		taskToUpdate.freq = freq;

		const updatedUser = await user.save();

		log('Updated task : ' + taskToUpdate);
		return !updatedUser ? null : taskToUpdate;
	} catch (err) {
		logError(`${getCurrentDate()} - task.dao - updateOne : ${err.message}. `);
		return null;
	}
};

//return deleted task id
const deleteOne = async (userId, taskId) => {
	try {
		const user = await User.findById(userId);

		const taskToRemove =
			user.tasks.watering.id(taskId) ||
			user.tasks.fertilization.id(taskId) ||
			user.tasks.repotting.id(taskId);

		log('Task to delete: ' + taskToRemove);

		taskToRemove.remove();

		const updatedUser = await user.save();

		return !updatedUser ||
			updatedUser.tasks.watering.id(taskId) ||
			user.tasks.fertilization.id(taskId) ||
			user.tasks.repotting.id(taskId)
			? null
			: updatedUser;
	} catch (err) {
		logError(`${getCurrentDate()} - task.dao - deleteOne : ${err.message}. `);
		return null;
	}
};

// return user
const deleteAll = async (userId) => {
	try {
		const user = await User.findById(userId);
		user.tasks.watering = [];
		user.tasks.fertilization = [];
		user.tasks.repotting = [];
		const updatedUser = await user.save();

		return !updatedUser ||
			updatedUser.tasks.watering > 0 ||
			updatedUser.tasks.fertilization > 0 ||
			updatedUser.tasks.repotting > 0
			? null
			: updatedUser;
	} catch (err) {
		logError(`${getCurrentDate()} - task.dao - deleteAll : ${err.message}. `);
		return null;
	}
};

export const TaskDAO = {
	readAll,
	create,
	updateOne,
	deleteOne,
	deleteAll,
};
