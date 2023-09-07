import { GraveDAO } from '../daos/grave.dao.js';
import { formatDeadPlant, formatDeadPlants } from '../utils/format.utils.js';

/* GET /all : Gets all dead plants - return dead plants list */
const getAll = async (req, res) => {
	const { userId } = req.body;
	const deadPlants = await GraveDAO.readAll(userId);

	if (!deadPlants)
		return res.status(400).json({ message: `cannot_get_dead_plants` });

	res.status(200).json({
		data: formatDeadPlants(deadPlants),
		message: 'request for all dead plants Ok',
	});
};

/* POST /create/:id : Adds dead plant to graveyard - return only the new ghost { id, plantName } */
const create = async (req, res) => {
	const { userId } = req.body;
	const plantId = req.params.id;

	const ghost = await GraveDAO.create(userId, plantId);

	if (!ghost)
		return res.status(400).json({ message: 'cannot_create_new_ghost' });

	res.status(201).json({
		message: 'ghost_created',
		data: { plantId, ghost: formatDeadPlant(ghost) },
	});
};

/* DELETE /delete : Deletes all ghosts from user's graveyard */
const deleteAll = async (req, res) => {
	const { userId } = req.body;

	const user = await GraveDAO.deleteAll(userId);

	if (!user)
		return res.status(400).json({ message: 'cannot_delete_graveyard' });

	res.status(200).json({
		message: `ghosts_are_gone`,
		data: user.graveyard,
	});
};

export const GraveyardController = {
	getAll,
	create,
	deleteAll,
};
