import mongoose from 'mongoose';
import {
	DEFAULT_ROOM,
	DEFAULT_THEME,
	DEFAULT_PICTURE,
	ERRORS,
	INVALID_DEFAULT_DATA,
} from '../utils/constants.utils.js';
import { emailIsValid } from '../utils/regex.utils.js';
import { numIsValid, passIsValid } from '../utils/validators.utils.js';

const { Schema } = mongoose;

const plantSchema = new Schema({
	plantName: { type: String, required: [true, ERRORS.required] },
	scientificName: String,
	room: { type: String, default: DEFAULT_ROOM },
	img: { type: String, default: DEFAULT_PICTURE },
	notes: String,
	light: String,
	tempMin: {
		type: Number,
		default: INVALID_DEFAULT_DATA,
		validate: {
			validator: numIsValid,
			message: ERRORS.notValid,
		},
	},
	tempMax: {
		type: Number,
		default: INVALID_DEFAULT_DATA,
		validate: {
			validator: numIsValid,
			message: ERRORS.notValid,
		},
	},
	watering: {
		type: Number,
		default: 0,
		validate: {
			validator: numIsValid,
			message: ERRORS.notValid,
		},
	},
	toxicity: Boolean,
	origin: String,
	soil: String,
	type: String,
	propagation: [String],
	date: String,
	size: {
		type: Number,
		default: INVALID_DEFAULT_DATA,
		validate: {
			validator: numIsValid,
			message: ERRORS.notValid,
		},
	},
	price: {
		type: Number,
		default: INVALID_DEFAULT_DATA,
		validate: {
			validator: numIsValid,
			message: ERRORS.notValid,
		},
	},
});

const taskSchema = new Schema({
	plantName: { type: String, required: [true, ERRORS.required] },
	freq: {
		type: Number,
		default: 365,
		required: [true, ERRORS.required],
		validate: {
			validator: numIsValid,
			message: ERRORS.notValid,
		},
	},
	date: { type: Date, required: [true, ERRORS.required] },
	level: {
		type: Number,
		default: 0,
		validate: {
			validator: numIsValid,
			message: ERRORS.notValid,
		},
	},
});

const wishSchema = new Schema({
	plantName: { type: String, required: [true, ERRORS.required] },
});

const deadPlantSchema = new Schema({
	plantName: { type: String, required: [true, ERRORS.required] },
});

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, ERRORS.required],
			lowercase: true,
			unique: true,
			validate: {
				validator: emailIsValid,
				message: ERRORS.notValid,
			},
		},
		password: {
			type: String,
			required: [true, ERRORS.required],
			validate: {
				validator: passIsValid,
				message: ERRORS.notValid,
			},
		},
		name: String,
		theme: { type: String, default: DEFAULT_THEME },
		plants: [{ type: plantSchema }],
		tasks: {
			watering: [{ type: taskSchema }],
			fertilization: [{ type: taskSchema }],
			repotting: [{ type: taskSchema }],
		},
		wishPlants: [{ type: wishSchema }],
		graveyard: [{ type: deadPlantSchema }],
	},
	{
		timestamps: true,
	}
);

// const User = new mongoose.model('User', userSchema);
const User = new mongoose.model('users', userSchema);
export default User;
