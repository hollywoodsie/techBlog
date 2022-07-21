require('dotenv').config({ path: './.env' });
const express = require('express');

const port = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
  res.send('some response');
});
app.listen(port, () => console.log(`Server started on ${port}`));
