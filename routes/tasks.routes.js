import { Router } from 'express';
import { TasksController } from '../controllers/tasks.controller.js';

const initTasksRoutes = (app, jwt, sanitize) => {
	const router = Router();
	router.get('/all', jwt, sanitize, TasksController.getAll);
	router.post('/create', jwt, sanitize, TasksController.create);
	router.put('/update/:id', jwt, sanitize, TasksController.updateOne);
	router.delete('/delete/:id', jwt, sanitize, TasksController.deleteOne);
	router.delete('/delete-all', jwt, sanitize, TasksController.deleteAll);

	app.use('/tasks', router);
};

export default initTasksRoutes;
