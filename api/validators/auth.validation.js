import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Invalid password').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Invalid email').isEmail(),
  body('password', 'Invalid password').isLength({ min: 5 }),
  body('fullName', 'Invalid name').isLength({ min: 3 }),
  body('avatarUrl', 'Invalid avatar url').optional().isURL(),
];
