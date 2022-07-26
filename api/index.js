import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user.routes.js';
import cors from 'cors';
mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log('Database connected...'))
  .catch((error) => console.log('Database connection error', error));

const port = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', router);

app.listen(port, () => console.log(`Server started on ${port}`));
