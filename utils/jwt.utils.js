import jwt from 'jsonwebtoken';
import { logError } from './logger.utils.js';
import { secret } from '../config/jwt.config.js';
import { getCurrentDate } from './date.utils.js';
import { stringIsFilled } from './validators.utils.js';

const jwtOptions = {
	expiresIn: `28800000`, // 8h
};

export const jwtVerify = (token) => {
	try {
		const decoded = jwt.verify(token, secret);
		const userId = decoded.data;
		return stringIsFilled(userId) ? userId : '';
	} catch (err) {
		logError(`${getCurrentDate()} - jwtVerify: error => `, err);
		return null;
	}
};

export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);
