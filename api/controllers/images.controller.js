import { ImagesService } from '../services/index.js';
import { generateFileName } from '../utils/generateImageName.js';

export const uploadImageToCloud = async (req, res) => {
  try {
    const { file } = req;
    const fileBuffer = req.file.buffer;
    const imageName = generateFileName();
    await ImagesService.uploadFile(fileBuffer, imageName, file.mimetype);
    res.status(200).json(imageName);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getImageFromCloud = async (req, res) => {
  try {
    const { key } = req.params;
    const image = await ImagesService.getObjectUrl(key);
    res.status(200).json(image);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteImageFromCloud = async (req, res) => {
  try {
    const { key } = req.params;
    await ImagesService.deleteFile(key);
    res.status(200).json({ message: 'Success deletion' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
