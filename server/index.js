require('dotenv').config();
const axios = require('axios');
const express = require('express');

const app = express();
const { PORT } = process.env;

app.use(express.static('client/dist'));

app.use(express.json());

const config = {
  headers: {
    Authorization: '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'
  },
};

app.get('/product-info/:id', (req, res) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}`;
  axios.get(url, config)
    .then((results) => res.send(results.data))
    .catch((err) => console.log('ERROR in Product Info API call', err));
});

app.get('/product-styles/:id', (req, res) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}/styles`;
  axios.get(url, config)
    .then((results) => res.send(results.data))
    .catch((err) => console.log('ERROR in styles API call', err));
});

app.get('/related-products/:id', (req, res) => {
  const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}/related`;
  axios.get(url, config)
    .then((results) => res.send(results.data))
    .catch((err) => console.log('ERROR in related products API call', err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});
