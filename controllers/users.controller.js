/* MODEL */
import User from '../models/user.model.js';
/* DAO */
import { UserDAO } from '../daos/user.dao.js';
// UTILS TODO - create index like anais
import { jwtSign } from '../utils/jwt.utils.js';
import { omitMulti } from '../utils/object.utils.js';
import { emailIsValid } from '../utils/regex.utils.js';
import { passIsValid } from '../utils/validators.utils.js';
/* AUTHENTICATION */
import bcrypt from 'bcrypt';

/* GET /check-token : Authenticates user - return name and theme of one user */
const checkUserToken = async (req, res) => {
	const { userId } = req.body;
	const user = await UserDAO.getById(userId);

	if (!user) return res.status(400).json({ message: 'user_not_found' });

	res.status(200).json({ data: omitMulti(user, ['password', 'id', 'email']) });
};

/* POST */
/* /signup : Creates a new user - return token and new user */
const createUser = async (req, res) => {
	const { name, email, password } = req.body;

	if (!emailIsValid(email.toLowerCase()) || !passIsValid(password))
		return res.status(403).json({ message: 'invalid_email_or_password' });

	const hash = bcrypt.hashSync(password, 10);

	const user = await UserDAO.create({ name, email, password: hash });

	if (!user) return res.status(409).json({ message: 'email_already_exists' });

	const token = jwtSign(user.id);

	res.status(201).json({
		message: 'user_created',
		data: omitMulti(user, ['password', 'id', 'email']),
		token,
	});
};

/* /signin : Connects user with email and password - return token and user's name and theme */
const connectUser = async (req, res) => {
	const { email, password } = req.body;

	if (!emailIsValid(email.toLowerCase()) || !passIsValid(password))
		return res.status(403).json({ message: 'invalid_email_or_password' });

	const user = await UserDAO.getByEmail(email);

	// check that email exists in db
	if (!user) return res.status(404).json({ message: 'user_not_found' });

	// check that password is correct
	if (bcrypt.compareSync(password, user.password)) {
		// generate a token from id
		const token = jwtSign(user.id);

		res.status(200).json({
			message: 'user_signed_in',
			data: omitMulti(user, ['password', 'id', 'email']),
			token,
		});
	} else {
		res.status(401).json({ message: 'incorrect_password' });
	}
};

/* PUT /update : Updates user - return user's name and favorite theme*/
const updateUser = async (req, res) => {
	const { userId, data } = req.body;

	//TODO - control valid types
	const user = await UserDAO.update(userId, data);

	if (!user)
		return res.status(400).json({ message: `cannot_update_user_data` });

	res.status(200).json({
		message: `user_updated`,
		data: { name: user.name, theme: user.theme },
	});
};

/* DELETE /delete : Deletes user */
const deleteUser = async (req, res) => {
	const { userId } = req.body;

	// TODO - 🚨DELETE IMAGES
	// await FileUtils.removeUserPlantFolder(userId);

	// Delete user's data - return {deletedCount: 1}
	const userDeleted = await User.deleteOne({ _id: userId });

	return !userDeleted
		? res.status(400).json({ message: `cannot_delete_user` })
		: res.status(200).json({ message: `user_deleted` });
};

export const UsersController = {
	checkUserToken,
	createUser,
	connectUser,
	updateUser,
	deleteUser,
};
