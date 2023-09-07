import { WishDAO } from '../daos/wish.dao.js';
import { formatWish, formatWishes } from '../utils/format.utils.js';

/* GET /all : Gets user's wishPlants - return all formated wished plants {id, plantName} */
const getAll = async (req, res) => {
	const { userId } = req.body;
	const wishes = await WishDAO.readAll(userId);

	if (!wishes) return res.status(400).json({ message: `cannot_get_wishes` });

	res.status(200).json({
		data: formatWishes(wishes).reverse(),
		message: 'request for all wishes Ok',
	});
};

/* POST /create : Creates a new wish - return only the new wish */
const create = async (req, res) => {
	const { userId, plantName } = req.body;

	const wish = await WishDAO.create(userId, {
		plantName: plantName.toLowerCase(),
	});

	if (!wish) return res.status(400).json({ message: 'cannot_create_new_wish' });

	res.status(201).json({ message: 'wish_created', data: formatWish(wish) });
};

/* DELETE /delete/:id : Deletes a wish from user's wishPlants */
const deleteOne = async (req, res) => {
	const { userId } = req.body;
	const { id } = req.params;

	const user = await WishDAO.deleteOne(userId, id);

	if (!user) return res.status(400).json({ message: 'cannot_delete_wish' });

	res.status(200).json({ message: `wish_${id}_deleted` });
};

export const WishController = {
	getAll,
	create,
	deleteOne,
};
