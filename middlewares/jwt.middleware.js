import { jwtVerify } from '../utils/jwt.utils.js';

//Middleware to check token before running controllers (cf router)
export const jwtMiddleware = (req, res, next) => {
	const token = req.headers.authorization;
	const userId = jwtVerify(token);

	if (!userId) return res.status(403).json({ message: 'unauthorized' });

	req.body = { ...req.body, userId }; //provide access to userId from anywhere now
	next();
};
