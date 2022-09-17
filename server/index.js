require('dotenv').config();

const express = require('express');
const compression = require('compression');
// const formData = require('express-form-data');
const axios = require('axios');
// const fileUpload = require('express-fileupload');
const RelatedRoute = require('./Routing/RelatedRoute');

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
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());

app.get('/productinfo/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}`, headers)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.send(err));
});

app.get('/styles/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}/styles`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

app.use('/related', RelatedRoute);

app.get('/qanda/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/?product_id=${req.params.id}&count=1000`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.post('/qanda/question/:id/submitanswer', (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/answers`, req.body, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.post('/qanda/question', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions', req.body, headers)
    .then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

app.get('/qanda/question/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      console.log(`Question ${req.params.id} marked helpful`);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

app.get('/qanda/question/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/reported`, {}, headers)
    .then(() => {
      console.log(`Question ${req.params.id} marked reported`);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

app.get('/qanda/answer/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      console.log(`Answer ${req.params.id} marked helpful`);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

app.get('/qanda/answer/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.params.id}/report`, {}, headers)
    .then(() => {
      console.log(`Answer ${req.params.id} marked reported`);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

app.get('/reviews/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

app.get('/reviews/meta/:id', (req, res) => {
  const { sortTerm } = req.query;
  if (sortTerm) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.params.id}&sort=${sortTerm}&count=50`, headers)
      .then((result) => res.send(result.data))
      .catch((err) => res.send(err));
  } else {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.params.id}&count=50`, headers)
      .then((result) => res.send(result.data))
      .catch((err) => res.send(err));
  }
});

app.get('/reviews/:review_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.params.review_id}/helpful`, {}, headers)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

app.get('/reviews/:review_id/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.params.review_id}/report`, {}, headers)
    .then((result) => {
      console.log('put result: ', result);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

app.post('/reviews', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', req.body, headers)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
});

app.post('/cart', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', {
    sku_id: req.body.sku_id,
    // count: req.body.count,
  }, headers).then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

app.post('/interactions', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions', req.body, headers)
    .then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});
