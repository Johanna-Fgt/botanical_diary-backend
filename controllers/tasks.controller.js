import { TaskDAO } from '../daos/task.dao.js';
import { log } from '../utils/logger.utils.js';
import { formatTask, formatTasks } from '../utils/format.utils.js';

/* GET /all : Gets all tasks - return { watering:[], fertilization:[], repotting:[]} */
const getAll = async (req, res) => {
	const { userId } = req.body;
	const tasks = await TaskDAO.readAll(userId);

	if (!tasks) return res.status(400).json({ message: `cannot_get_tasks` });

	res.status(200).json({
		data: {
			watering: formatTasks(tasks.watering),
			fertilization: formatTasks(tasks.fertilization),
			repotting: formatTasks(tasks.repotting),
		},
		message: 'request for all tasks Ok',
	});
};

/* POST /create : Creates new task - return only the new task {id, plantName, date, freq, waterLevel} */
const create = async (req, res) => {
	const { userId, taskList, plantName, date, freq } = req.body;
	const task = await TaskDAO.create(userId, taskList, {
		plantName,
		date,
		freq,
	});

	if (!task) return res.status(400).json({ message: 'cannot_create_new_task' });

	res.status(201).json({ message: 'task_created', data: formatTask(task) });
};

/* PUT /update/:id : Updates a specific task - return updatedTask */
const updateOne = async (req, res) => {
	const { userId, date, freq } = req.body;
	const { id } = req.params;

	const updatedTask = await TaskDAO.updateOne(userId, id, date, freq);

	if (!updatedTask)
		return res.status(400).json({ message: `cannot_update_task` });

	res.status(200).json({
		message: `task_${id}_updated`,
		data: formatTask(updatedTask),
	});
};

/* DELETE */
/* /delete/:id : Deletes a specific task */
const deleteOne = async (req, res) => {
	const { userId } = req.body;
	const { id } = req.params;

	const user = await TaskDAO.deleteOne(userId, id);

	if (!user) return res.status(400).json({ message: 'cannot_delete_task' });

	res.status(200).json({ message: `task_${id}_deleted` });
};

/* /delete-all : Deletes all tasks */
const deleteAll = async (req, res) => {
	const { userId } = req.body;

	const user = await TaskDAO.deleteAll(userId);

	if (!user) return res.status(400).json({ message: 'cannot_delete_tasks' });

	res.status(200).json({
		message: `tasks_have_been_deleted`,
		data: user.tasks,
	});
};

export const TasksController = {
	getAll,
	create,
	updateOne,
	deleteOne,
	deleteAll,
};
