import React from 'react';
import axios from 'axios';
import localStorage from 'local-storage';
import { averageRating, totalReviews } from '../utilities.js';
import ProductOverview from './ProductOverview/OverviewIndex.jsx';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import OutfitList from './OutfitList/OutfitList.jsx';
import QandA from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingAndReview from './RatingsAndReviews/RatingAndReview.jsx';

const defaultId = 71704;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: defaultId,
      productInfo: null,
      productStyles: null,
      qandaInfo: null,
      rating: null,
      reviewCount: null,
      reviewPage: null,
      reviews: [],
      outfits: [],
    };

    this.scrollTarget = React.createRef();

    this.handleProductIdChange = this.handleProductIdChange.bind(this);
    this.handleAddOutfitClick = this.handleAddOutfitClick.bind(this);
    this.handleRemoveOutfitClick = this.handleRemoveOutfitClick.bind(this);
    this.handleProductCardClick = this.handleProductCardClick.bind(this);
    this.executeScroll = this.executeScroll.bind(this);
  }

  componentDidMount() {
    this.getInitialData(defaultId);
  }

  handleProductIdChange(newId) {
    // this.getInitialData(id);
    this.setState({
      productId: newId,
    });
  }

  handleProductCardClick(id) {
    this.getInitialData(id);
  }

  handleAddOutfitClick(e) {
    e.preventDefault();
    const {
      productInfo, productStyles, outfits, productId, rating,
    } = this.state;

    // check for duplicates
    let isDuplicate = false;
    outfits.forEach((product) => {
      if (product.id === productId) {
        isDuplicate = true;
      }
    });

    if (!isDuplicate) {
      // Combine Product Info and Styles to one object
      const currentProduct = productInfo;
      currentProduct.styles = productStyles;
      currentProduct.rating = rating;

      // create new array for local storage
      const updatedOutArr = outfits.slice();
      updatedOutArr.push(currentProduct);

      // add to local storage
      localStorage.set('outfitList', updatedOutArr);
      this.setState({
        outfits: updatedOutArr,
      });
    }
  }

  handleRemoveOutfitClick(e) {
    e.preventDefault();
    const { outfits } = this.state;

    const currOutfits = outfits.slice();
    const updatedOutArr = currOutfits.filter((value) => value.id !== Number(e.target.getAttribute('value')));

    localStorage.set('outfitList', updatedOutArr);
    this.setState({
      outfits: updatedOutArr,
    });
  }

  getInitialData(productId) {
    let productInfo; let productStyles; let
      qandaInfo;

    axios.get(`/productinfo/${productId}`)
      .then((results) => {
        productInfo = results.data;
      })
      .then(() => {
        axios.get(`/styles/${productId}`)
          .then((results) => {
            productStyles = results.data.results;
          })
          .then(() => {
            axios.get(`/qanda/${productId}`)
              .then((results) => {
                qandaInfo = results.data;
              })
              .then(() => {
                axios.get(`/reviews/${productId}`)
                  .then((results) => {
                    const { ratings } = results.data;
                    this.setState({
                      productId,
                      productInfo,
                      productStyles,
                      qandaInfo,
                      rating: averageRating(ratings),
                      reviewCount: totalReviews(ratings),
                      outfits: localStorage.get('outfitList') || [],
                    });
                  })
                  .then(() => {
                    // both /review endpoints will be swapped at a later date
                    axios.get(`/reviews/meta/${productId}`)
                      .then((result) => {
                        this.setState({
                          reviewPage: result.data.page,
                          reviews: result.data.results,
                        });
                      });
                  });
              });
          });
      });
  }

  // getInitialData(productId) {
  //   const req1 = axios.get(`/productinfo/${productId}`);
  //   const req2 = axios.get(`/styles/${productId}`);
  //   const req3 = axios.get(`/qanda/${productId}`);
  //   const req4 = axios.get(`/reviews/${productId}`);

  //   const requests = [req1, req2, req3, req4];

  //   axios.all(requests).then(axios.spread((res1, res2, res3, res4) => {
  //     this.setState({
  //       productInfo: res1.data,
  //       productStyles: res2.data.results,
  //       qandaInfo: res3.data,
  //       rating: averageRating(res4.data),
  //       reviewCount: totalReviews(res4.data),
  //       outfits: localStorage.get('outfitList') || [],
  //     });
  //   }));
  // }

  executeScroll() {
    this.scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const {
      productId,
      productInfo,
      productStyles,
      qandaInfo,
      rating,
      reviewCount,
      reviewPage,
      reviews,
      outfits,
    } = this.state;

    if (!productInfo || !productStyles) {
      return <div />;
    }

    return (
      <div className="all-content">
        <div>
          <ProductOverview
            key={productInfo.id}
            productInfo={productInfo}
            productStyles={productStyles}
            rating={rating}
            reviewCount={reviewCount}
            handleAddOutfitClick={this.handleAddOutfitClick}
            handleRemoveOutfitClick={this.handleRemoveOutfitClick}
            executeScroll={this.executeScroll}
          />
        </div>
        <div className="additional-content">
          <RelatedProducts
            productId={productId}
            currProduct={productInfo}
            handleProductCardClick={this.handleProductCardClick}
          />
          <OutfitList
            productInfo={productInfo}
            productStyles={productStyles}
            outfits={outfits}
            handleAddOutfitClick={this.handleAddOutfitClick}
            handleRemoveOutfitClick={this.handleRemoveOutfitClick}
            rating={rating}
          />

          <QandA info={qandaInfo} />
          <div ref={this.scrollTarget}>
            <RatingAndReview reviews={reviews} page={reviewPage} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
