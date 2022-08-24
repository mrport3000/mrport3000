require('dotenv').config();

const express = require('express');
const axios = require('axios');

const app = express();
const { PORT } = process.env;
const headers = {
  headers: {
    Authorization: process.env.AUTH,
  },
};

app.use(express.static('client/dist'));

app.get('/productinfo/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/styles/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}/styles`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/related/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}/related`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/reviews/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});
