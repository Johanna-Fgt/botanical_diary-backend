import { Router } from 'express';
import { PlantsController } from '../controllers/plants.controller.js';

const initPlantsRoutes = (app, jwt, sanitize) => {
	const router = Router();
	router.get('/all', jwt, sanitize, PlantsController.getAll);
	router.get('/plant/:id', jwt, sanitize, PlantsController.getOne);
	// router.get('/img/:id', jwt, sanitize, PlantsController.getImg);
	router.post('/create', jwt, sanitize, PlantsController.create);
	// router.post('/create-image/:id', jwt, sanitize, PlantsController.createImage);
	router.put('/update/:id', jwt, sanitize, PlantsController.updateOne);
	// router.put('/update-image/:id', jwt, sanitize, PlantsController.updateImage);
	router.delete('/delete/:id', jwt, sanitize, PlantsController.deleteOne);

	app.use('/plants', router);
};

export default initPlantsRoutes;
