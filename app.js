import 'dotenv/config';
import express from 'express';
import initDb from './models/connection.js';
import initRoutes from './routes/router.js';
import initMiddlewares from './middlewares/init.js';

const app = express();

await initDb();

initMiddlewares(app);

initRoutes(app);

export default app;
