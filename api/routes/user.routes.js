import express, { application } from 'express';
import { registerValidation } from '../validators/auth.validation.js';
import { postCreateValidation } from '../validators/post.validation.js';
import { checkAuth, validationErrorsHandler } from '../middleware/index.js';
import {
  UserController,
  PostController,
  ImagesController,
} from '../controllers/index.js';
import { upload } from '../middleware/uploadImages.js';

const router = express.Router();

//user routes
router.post(
  '/auth/register',
  registerValidation,
  validationErrorsHandler,
  UserController.register
);
router.post(
  '/auth/login',

  validationErrorsHandler,
  UserController.login
);
router.get('/auth/me', checkAuth, UserController.getMe);
router.patch(
  '/settings',
  checkAuth,
  registerValidation,
  validationErrorsHandler,
  UserController.updateUser
);
//post routes
router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.getOne);
router.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  validationErrorsHandler,
  PostController.create
);
router.patch(
  '/posts/:id',
  checkAuth,
  validationErrorsHandler,
  PostController.update
);
router.delete('/posts/:id', checkAuth, PostController.remove);
router.get('/tags', PostController.getTags);
router.get('/tags/:tag', PostController.getSpecific);
//images
router.post(
  '/images',
  upload.single('image'),
  ImagesController.uploadImageToCloud
);

router.get('/images/:key', ImagesController.getImageFromCloud);

router.delete('/images/:key', ImagesController.deleteImageFromCloud);

export default router;
