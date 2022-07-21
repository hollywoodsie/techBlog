const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.listen(PORT, () => console.log(`Server started on ${port}`));
