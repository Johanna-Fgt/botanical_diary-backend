import { Router } from 'express';
import { UsersController } from '../controllers/users.controller.js';

const initUsersRoutes = (app, jwt, sanitize) => {
	const router = Router();
	router.get('/check-token', jwt, sanitize, UsersController.checkUserToken);
	router.post('/signup', sanitize, UsersController.createUser);
	router.post('/signin', sanitize, UsersController.connectUser);
	router.put('/update', jwt, sanitize, UsersController.updateUser);
	router.delete('/delete', jwt, sanitize, UsersController.deleteUser);

	app.use('/users', router);
};

export default initUsersRoutes;
