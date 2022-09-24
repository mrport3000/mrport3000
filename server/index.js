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

/*-----------------------------------------------------------------------------
  PRODUCT INFORMATION:
  --------------------
  Returns all product level information for a specified product id.
-----------------------------------------------------------------------------*/
app.get('/productinfo/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}`, headers)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  PRODUCT STYLES:
  ---------------
  Returns the all styles available for the given product.
-----------------------------------------------------------------------------*/
app.get('/styles/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${req.params.id}/styles`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  RELATED PRODUCTS:
  -----------------
  Custom route for related products. SEE ./Routing/RelatedRoute
-----------------------------------------------------------------------------*/
app.use('/related', RelatedRoute);

/*-----------------------------------------------------------------------------
  LIST QUESTIONS:
  ---------------
  Retrieves a list of questions for a particular product. This list does not
  include any reported questions.
-----------------------------------------------------------------------------*/
app.get('/qanda/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/?product_id=${req.params.id}&count=1000`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

/*-----------------------------------------------------------------------------
  ANSWERS LIST:
  -------------
  Returns answers for a given question. This list does not include any
  reported answers.
-----------------------------------------------------------------------------*/
app.get('/qanda/answers/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/answers?count=999`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

/*-----------------------------------------------------------------------------
  ADD A QUESTION:
  ---------------
  Adds a question for the given product
-----------------------------------------------------------------------------*/
app.post('/qanda/question', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions', req.body, headers)
    .then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  ADD AN ANSWER:
  --------------
  Adds an answer for the given question
-----------------------------------------------------------------------------*/
app.post('/qanda/question/:id/submitanswer', (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/answers`, req.body, headers)
    .then((result) => res.send(result.data))
    .catch((err) => console.log(err));
});

/*-----------------------------------------------------------------------------
  MARK QUESTION AS HELPFUL:
  -------------------------
  Updates a question to show it was found helpful.
-----------------------------------------------------------------------------*/
app.get('/qanda/question/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      console.log(`Question ${req.params.id} marked helpful`);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  REPORT QUESTION:
  ----------------
  Updates a question to show it was reported. Note, this action does not delete
  the question, but the question will not be returned in the above GET request.
-----------------------------------------------------------------------------*/
app.get('/qanda/question/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/questions/${req.params.id}/reported`, {}, headers)
    .then(() => {
      console.log(`Question ${req.params.id} marked reported`);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  MARK ANSWER AS HELPFUL:
  -----------------------
  Updates an answer to show it was found helpful.
-----------------------------------------------------------------------------*/
app.get('/qanda/answer/helpful/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.params.id}/helpful`, {}, headers)
    .then(() => {
      console.log(`Answer ${req.params.id} marked helpful`);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  REPORT ANSWER:
  --------------
  Updates an answer to show it has been reported. Note, this action does not
  delete the answer, but the answer will not be returned in the above
  GET request.
-----------------------------------------------------------------------------*/
app.get('/qanda/answer/reported/:id', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/qa/answers/${req.params.id}/report`, {}, headers)
    .then(() => {
      console.log(`Answer ${req.params.id} marked reported`);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  GET (SORTED) REVIEWS:
  ---------------------
  1.) Returns reviews for a given product in the specified sort order.
  2.) Returns a list of reviews for a particular product. This list does not
      include any reported reviews.
-----------------------------------------------------------------------------*/
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

/*-----------------------------------------------------------------------------
  GET REVIEW METADATA:
  --------------------
  Returns review metadata for a given product.
-----------------------------------------------------------------------------*/
app.get('/reviews/:id', (req, res) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${req.params.id}`, headers)
    .then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  ADD A REVIEW:
  -------------
  Adds a review for the given product.
-----------------------------------------------------------------------------*/
app.post('/reviews', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews', req.body, headers)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  MARK REVIEW AS HELPFUL:
  -----------------------
  Updates a review to show it was found helpful.
-----------------------------------------------------------------------------*/
app.get('/reviews/:review_id/helpful', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.params.review_id}/helpful`, {}, headers)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  REPORT REVIEW:
  --------------
  Updates a review to show it was reported. Note, this action does not delete
  the review, but the review will not be returned in the above GET request.
-----------------------------------------------------------------------------*/
app.get('/reviews/:review_id/report', (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/${req.params.review_id}/report`, {}, headers)
    .then((result) => {
      console.log('put result: ', result);
      res.sendStatus(204);
    })
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  ADD TO CART:
  ------------
  Adds a product to the cart.
-----------------------------------------------------------------------------*/
app.post('/cart', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/cart', {
    sku_id: req.body.sku_id,
    // count: req.body.count,
  }, headers).then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  LOG AN INTERACTION:
  -------------------
  Adds a interaction to the database.
-----------------------------------------------------------------------------*/
app.post('/interactions', (req, res) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions', req.body, headers)
    .then((result) => res.send(result.data))
    .catch((err) => res.send(err));
});

/*-----------------------------------------------------------------------------
  LISTEN:
  -------
  ...listens.
-----------------------------------------------------------------------------*/
app.listen(PORT, () => {
  console.log(`Example app listening on port: ${PORT}`);
});
