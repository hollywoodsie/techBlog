import { body } from 'express-validator';

export const postCreateValidation = [
  body('title', 'No article title').isLength({ min: 3 }).isString(),
  body('text', 'No article content').isLength({ min: 3 }).isString(),
  body('tags', 'Invalid tags').optional().isArray(),
  body('imageUrl', 'Invalid ImageURL').optional().isString(),
];
