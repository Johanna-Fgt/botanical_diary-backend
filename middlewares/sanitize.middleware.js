import escape from 'validator/lib/escape.js';
import { log } from '../utils/logger.utils.js';
import { isString } from '../utils/validators.utils.js';

//Cross-site scripting (XSS) prevent attackers from injecting malicious scripts on websites using client code
export const sanitizeMiddleware = (req, res, next) => {
	const keys = Object.keys(req.body);

	const sanitizedBody = keys.reduce((toBuild, key) => {
		const value = req.body[key];
		const escaped = isString(value) ? escape(value) : value;
		return { ...toBuild, [key]: escaped };
	}, {});

	log('sanitized body : ', sanitizedBody);
	req.body = { ...sanitizedBody };
	next();
};
