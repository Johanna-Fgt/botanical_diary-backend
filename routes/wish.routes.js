import { Router } from 'express';
import { WishController } from '../controllers/wish.controller.js';

const initWishRoutes = (app, jwt, sanitize) => {
	const router = Router();
	router.get('/all', jwt, sanitize, WishController.getAll);
	router.post('/create', jwt, sanitize, WishController.create);
	router.delete('/delete/:id', jwt, sanitize, WishController.deleteOne);

	app.use('/wishes', router);
};

export default initWishRoutes;
