require('dotenv').config();

const express = require('express');
const compression = require('compression');
const formData = require('express-form-data');
const axios = require('axios');
const fileUpload = require('express-fileupload');
// const os = require('os');

const app = express();

// const options = {
//   uploadDir: os.tmpdir(),
//   autoClean: true,
// };

// app.use(express.urlencoded({ extended: true }));
// // parse data with connect-multiparty.
// app.use(formData.parse(options));
// // delete from the request all empty files (size == 0)
// app.use(formData.format());
// // change the file objects to fs.ReadStream
// app.use(formData.stream());
// // union the body and the files
// app.use(formData.union());

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
app.use(fileUpload());

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
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      console.log(`Question ${req.params.id} marked helpful`);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
});

app.get('/qanda/question/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/reported`, {}, headers)
    .then(() => {
      console.log(`Question ${req.params.id} marked reported`);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
});

app.get('/qanda/answer/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      console.log(`Answer ${req.params.id} marked helpful`);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
});

app.get('/qanda/answer/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.params.id}/report`, {}, headers)
    .then(() => {
      console.log(`Answer ${req.params.id} marked reported`);
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
});

app.get('/reviews/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.get('/reviews/meta/:id', (req, res) => {
  const { sortTerm } = req.query;
  if (sortTerm) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.params.id}&sort=${sortTerm}`, headers)
      .then((result) => res.send(result.data))
      .catch((err) => console.log(err));
  } else {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews?product_id=${req.params.id}`, headers)
      .then((result) => res.send(result.data))
      .catch((err) => console.log(err));
  }
});

app.post('/reviews', (req, res) => {
  console.log('review: ', req.body);
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews`, req.body, headers)
    .then((result) => {
      console.log('success: ', result);
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.post('/cart', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', {
    sku_id: req.body.sku_id,
    // count: req.body.count,
  }, headers).then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.post('/interactions', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions', req.body, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});
