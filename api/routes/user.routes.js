import express from 'express';
import {
  loginValidation,
  registerValidation,
} from '../validators/auth.validation.js';
import { postCreateValidation } from '../validators/post.validation.js';
import { register, login, getMe } from '../controllers/user.controller.js';
import { checkAuth } from '../middleware/checkAuth.js';
import { create, getAll, getOne } from '../controllers/post.controller.js';

const router = express.Router();

//user routes
router.post('/auth/register', registerValidation, register);
router.post('/auth/login', loginValidation, login);
router.get('/auth/me', checkAuth, getMe);

//post routes
router.post('/posts', checkAuth, postCreateValidation, create);
router.get('/posts', getAll);
router.get('/posts/:id', getOne);
// router.put('/posts', update);
// router.delete('/posts', remove);

export default router;
