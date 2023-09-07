import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

const initMiddlewares = (app) => {
	//CORS- access autorizations
	const corsOptions = {
		origin: '*',
	};

	app.use(cors(corsOptions));

	//Increase security
	app.use(helmet());

	//parse requests of content-type - application/json with size limit
	app.use(express.json({ limit: '50mb' }));

	//parse requests of content-type - application/x-www-form-urlencoded
	app.use(express.urlencoded({ extended: true }));

	app.use(logger('dev'));

	app.use(cookieParser());

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	app.use('/static', express.static(path.join(__dirname, 'public')));
};

export default initMiddlewares;
