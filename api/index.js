require('dotenv').config({ path: './.env' });
const express = require('express');
const userRouter = require('./routes/user.routes');
const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.listen(port, () => console.log(`Server started on ${port}`));
