require('dotenv').config();

const express = require('express');

const app = express();
const { PORT } = process.env;

app.use(express.static('client/dist'));

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});
