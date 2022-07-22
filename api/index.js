import 'dotenv/config';
import jwt from 'jsonwebtoken';
import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validators/auth.validation.js';
import { validationResult } from 'express-validator';

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log('Database connected...'))
  .catch((error) => console.log('Database connection error', error));
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.post('auth/register', registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  res.json({
    success: true,
  });
});
app.listen(port, () => console.log(`Server started on ${port}`));
