import express from 'express';
import { registerValidation } from '../validators/auth.validation.js';
import { postCreateValidation } from '../validators/post.validation.js';
import { checkAuth, validationErrorsHandler } from '../middleware/index.js';
import { UserController, PostController } from '../controllers/index.js';

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
export default router;
