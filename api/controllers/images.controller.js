import { ImagesService } from '../services/index.js';
import { generateFileName } from '../utils/generateImageName.js';

export const uploadImageToCloud = async (req, res, next) => {
  try {
    const file = req.file;
    const fileBuffer = req.file.buffer;
    const imageName = generateFileName();
    await ImagesService.uploadFile(fileBuffer, imageName, file.mimetype);
    res.status(200).json(imageName);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getImageFromCloud = async (req, res, next) => {
  try {
    const key = req.params.key;
    const imageUrl = await ImagesService.getObjectSignedUrl(key);
    res.status(200).json(imageUrl);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteImageFromCloud = async (req, res, next) => {
  try {
    const key = req.params.key;
    await ImagesService.deleteFile(key);
    res.status(200).json({ message: 'Success deletion' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
