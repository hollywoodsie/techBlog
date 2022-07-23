import express from 'express';
import { registerValidation } from '../validators/auth.validation.js';
import { register, login, getMe } from '../controllers/user.controller.js';
import { checkAuth } from '../middleware/checkAuth.js';
const router = express.Router();

router.post('/auth/register', registerValidation, register);
router.post('/auth/login', registerValidation, login);
router.post('/auth/me', checkAuth, getMe);

router.get('/', (req, res) => {
  res.send('HOMEPAGE');
});

export default router;
