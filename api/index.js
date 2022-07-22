import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import mongoose from 'mongoose';
import { registerValidation } from './validators/auth.validation.js';
import { validationResult } from 'express-validator';
import UserModel from './models/user.model.js';
mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log('Database connected...'))
  .catch((error) => console.log('Database connection error', error));

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.post('auth/register', registerValidation, async (req, res) => {});
app.listen(port, () => console.log(`Server started on ${port}`));
