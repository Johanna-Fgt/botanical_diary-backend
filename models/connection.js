import mongoose from 'mongoose';
import { logError } from '../utils/logger.utils.js';

const connectionString = process.env.CONNECTION_STRING;

const initDb = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(connectionString, { connectTimeoutMS: 2000 });
		console.log('🍃 Database connected 🍃');
	} catch (err) {
		logError(`💥 Problem - initDB : ${err}`);
	}
};

export default initDb;
