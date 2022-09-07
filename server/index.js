require('dotenv').config();

const express = require('express');
const compression = require('compression');
const axios = require('axios');

const app = express();
const { PORT } = process.env;
const headers = {
  headers: {
    Authorization: process.env.AUTH,
  },
};

app.use(compression());
app.use(express.static('client/dist'));
app.use(express.json());

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

app.get('/qanda/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/qanda/question/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/?question_id=${req.params.id}/helpful`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/qanda/question/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/?question_id=${req.params.id}/reported`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/qanda/answer/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});

app.get('/qanda/answer/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/?answer_id=${req.params.id}/reported`, {}, headers)
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
});

app.get('/reviews/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/reviews/meta/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.post('/cart', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', {
    sku_id: req.body.sku_id,
    // count: req.body.count,
  }, headers).then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});
