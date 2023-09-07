import { Router } from 'express';
import { GraveyardController } from '../controllers/graveyard.controller.js';

const initGraveyardRoutes = (app, jwt, sanitize) => {
	const router = Router();
	router.get('/all', jwt, sanitize, GraveyardController.getAll);
	router.post('/create/:id', jwt, sanitize, GraveyardController.create);
	router.delete('/delete', jwt, sanitize, GraveyardController.deleteAll);

	app.use('/graveyard', router);
};

export default initGraveyardRoutes;
