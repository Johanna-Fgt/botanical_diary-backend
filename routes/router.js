import initWishRoutes from './wish.routes.js';
import initUsersRoutes from './users.routes.js';
import initTasksRoutes from './tasks.routes.js';
import initPlantsRoutes from './plants.routes.js';
import initGraveyardRoutes from './graveyard.routes.js';
import { jwtMiddleware } from '../middlewares/jwt.middleware.js';
import { sanitizeMiddleware } from '../middlewares/sanitize.middleware.js';

const initRoutes = (app) => {
	initWishRoutes(app, jwtMiddleware, sanitizeMiddleware);
	initUsersRoutes(app, jwtMiddleware, sanitizeMiddleware);
	initTasksRoutes(app, jwtMiddleware, sanitizeMiddleware);
	initPlantsRoutes(app, jwtMiddleware, sanitizeMiddleware);
	initGraveyardRoutes(app, jwtMiddleware, sanitizeMiddleware);
};

export default initRoutes;
