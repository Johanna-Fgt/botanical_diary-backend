//USERS
export const formatUser = (user) => {
	return {
		name: user.name,
		id: user._id,
		email: user.email,
		password: user.password,
		theme: user.theme,
	};
};

export const formatUsers = (users) => {
	return users.map(formatUser);
};

//TASKS
export const formatTask = (task) => {
	return {
		id: task._id,
		plantName: task.plantName,
		date: task.date,
		freq: task.freq,
		level: task.waterLevel,
	};
};
export const formatTasks = (tasks) => {
	return tasks.map(formatTask);
};

//WISHES
export const formatWish = (wish) => {
	return {
		id: wish._id,
		plantName: wish.plantName,
	};
};
export const formatWishes = (wishes) => {
	return wishes.map(formatWish);
};

//GRAVEYARD
export const formatDeadPlant = (plant) => {
	return {
		id: plant._id,
		plantName: plant.plantName,
	};
};
export const formatDeadPlants = (plants) => {
	return plants.map(formatDeadPlant);
};

//PLANTS
export const formatPlant = (plant) => {
	return {
		plantName: plant.plantName,
		id: plant._id,
		scientificName: plant.scientificName,
		room: plant.room,
		img: plant.img,
		notes: plant.notes,
		light: plant.light,
		tempMin: plant.tempMin,
		tempMax: plant.tempMax,
		watering: plant.watering,
		toxicity: plant.toxicity,
		origin: plant.origin,
		soil: plant.soil,
		type: plant.type,
		propagation: plant.propagation,
		date: plant.date,
		size: plant.size,
		price: plant.price,
	};
};

export const formatPlants = (plants) => {
	return plants.map(formatPlant);
};
