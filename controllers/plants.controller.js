import { PlantDAO } from '../daos/plant.dao.js';
// import { FileUtils } from '../utils/file.utils.js';
import { formatPlant, formatPlants } from '../utils/format.utils.js';
// import {
// 	UPLOAD_PATH,
// 	UploadUtils,
// 	DEFAULT_IMG_PATH,
// } from '../utils/upload.utils.js';

//***************GET***************
//return list of formated plants (LIFO)
const getAll = async (req, res) => {
	const { userId } = req.body;
	const plants = await PlantDAO.getAll(userId);

	if (!plants) return res.status(400).json({ message: `can't find plants` });

	res.status(200).json({
		data: formatPlants(plants).reverse(),
		message: 'request for all plants Ok',
	});
};

//return one formated plant
const getOne = async (req, res) => {
	const { userId } = req.body;
	const { id } = req.params;
	const plant = await PlantDAO.getOne(userId, id);
	if (!plant) return res.status(400).json({ message: `cannot_find_plant` });

	res.status(200).json({ data: formatPlant(plant), message: 'plant_found' });
};

//return image path
// const getImg = async (req, res) => {
// 	const { userId } = req.body;
// 	const { id } = req.params;

// 	const plant = await PlantDAO.getOne(userId, id);

// 	if (!plant?.img) return res.status(400).json({ message: `cannot_find_img` });

// 	const path =
// 		plant.img === DEFAULT_IMG_PATH
// 			? `${UPLOAD_PATH}${plant.img}`
// 			: `${UPLOAD_PATH}${userId}/${plant.img}`;

// 	res.status(200).sendFile(path);
// };

//***************POST***************
//Create and return a new formated {plant}
const create = async (req, res) => {
	const { userId, newPlant } = req.body;
	const plant = await PlantDAO.create(userId, newPlant);

	if (!plant) return res.status(400).json({ message: `cannot_create_plant` }); //'plant_already_exist'

	res.status(201).json({ message: 'plant_created', data: formatPlant(plant) });
};

//Create image in user's folder and return {plant}
// const createImage = async (req, res) => {
// 	const { userId } = req.body;
// 	const { id } = req.params;

// 	// manage FormData
// 	const fieldName = 'img';
// 	const dest = `${userId}/${fieldName}/`;
// 	const filter = UploadUtils.getImageFilter();
// 	const options = UploadUtils.getUploadOptions(fieldName, dest, 2, filter);
// 	const result = await UploadUtils.saveOneImage(req, res, options);

// 	if (!result) return res.status(422).json({ message: `cannot_save_image` });

// 	// get datas
// 	const { file } = result;
// 	const fileName = file?.filename || null;
// 	const img = file ? `${fieldName}/${fileName}` : DEFAULT_IMG_PATH;

// 	// add img to plant
// 	const plant = await PlantDAO.createImage(userId, id, img);

// 	if ((!plant || !file) && plant?.img !== DEFAULT_IMG_PATH)
// 		await FileUtils.removeUserPlantFolder(userId, plant.img);

// 	if (!plant)
// 		return res.status(400).json({ message: `cannot_create_plant_image` });

// 	res
// 		.status(201)
// 		.json({ message: 'plant_image_created', data: formatPlant(plant) });
// };

//***************PUT***************
//return formated updated {plant}
const updateOne = async (req, res) => {
	const plantId = req.params.id;
	const { userId, plantDatas } = req.body;

	const plant = await PlantDAO.updateOne(userId, plantId, plantDatas);

	if (!plant) return res.status(400).json({ message: `cannot_update_plant` });

	res.status(200).json({ message: `plant_updated`, data: formatPlant(plant) });
};

//return formated updated {plant} with new image created and old image deleted from user's folder
// const updateImage = async (req, res) => {
// 	const { userId } = req.body;
// 	const { id } = req.params;

// 	// manage FormData
// 	const fieldName = 'img';
// 	const dest = `${userId}/${fieldName}/`;
// 	const filter = UploadUtils.getImageFilter();
// 	const options = UploadUtils.getUploadOptions(fieldName, dest, 2, filter);
// 	const result = await UploadUtils.saveOneImage(req, res, options);

// 	if (!result) return res.status(422).json({ message: `cannot_save_image` });

// 	// get datas
// 	const { file } = result;
// 	const fileName = file?.filename || null;
// 	const img = file ? `${fieldName}/${fileName}` : DEFAULT_IMG_PATH;

// 	// add img to plant
// 	const plant = await PlantDAO.updateImage(userId, id, img);

// 	// if ((!plant || !file) && plant?.img !== DEFAULT_IMG_PATH)
// 	// 	await FileUtils.removeUserPlantFile(userId, plant.img);

// 	if (!plant)
// 		return res.status(400).json({ message: `cannot_update_plant_image` });

// 	res.status(201).json({ message: 'plant_created', data: formatPlant(plant) });
// };

//***************DELETE***************
//return only the deleted plant id
const deleteOne = async (req, res) => {
	const plantId = req.params.id;
	const { userId } = req.body;
	const user = await PlantDAO.deleteOne(userId, plantId);

	if (!user) return res.status(400).json({ message: `cannot_delete_plant` });

	res.status(200).json({
		message: `plant _deleted`,
		plant: plantId,
	});
};

export const PlantsController = {
	getAll,
	getOne,
	// getImg,
	create,
	// createImage,
	updateOne,
	// updateImage,
	deleteOne,
};
