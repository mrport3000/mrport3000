import React from 'react';
import axios from 'axios';
import localStorage from 'local-storage';
import { AUTH } from '../config.js';
import { averageRating, totalReviews } from '../utilities.js';
import ProductOverview from './ProductOverview/OverviewIndex.jsx';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import OutfitList from './OutfitList/OutfitList.jsx';
import QandA from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';

const defaultId = 71704;

import RatingAndReview from './RatingsAndReviews/RatingAndReview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: defaultId,
      productInfo: null,
      productStyles: null,
      rating: null,
      reviewCount: null,
      outfits: [],
    };
    this.handleProductIdChange = this.handleProductIdChange.bind(this);
    this.handleAddOutfitClick = this.handleAddOutfitClick.bind(this);
    this.handleRemoveOutfitClick = this.handleRemoveOutfitClick.bind(this);
    this.handleProductCardClick = this.handleProductCardClick.bind(this);
  }

  componentDidMount() {
    this.getInitialData(defaultId);
  }

  handleProductIdChange(newId) {
    this.setState({
      productId: newId,
    });
  }

  handleProductCardClick(id) {
    console.log('PRODUCT CARD CLICK');
    this.getInitialData(id);
  }

  handleAddOutfitClick(e) {
    e.preventDefault();
    console.log('ADD OUTFIT CLICK');
    const {
      productInfo, productStyles, outfits, productId,
    } = this.state;

    // check for duplicates
    let isDuplicate = false;
    outfits.forEach((product) => {
      if (product.id === productId) {
        isDuplicate = true;
      }
    });

    if (isDuplicate) {
      console.log('DUPLICATE ITEM');
    } else {
      // Combine Product Info and Styles to one object
      const currentProduct = productInfo;
      currentProduct.styles = productStyles;

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
    console.log('REMOVE OUTFIT CLICK');
    const { outfits } = this.state;

    const currOutfits = outfits.slice();
    const updatedOutArr = currOutfits.filter((value) => value.id !== Number(e.target.getAttribute('value')));

    localStorage.set('outfitList', updatedOutArr);
    this.setState({
      outfits: updatedOutArr,
    });
  }

  getInitialData(productId) {
    let productInfo, productStyles;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}`, {
      headers: {
        Authorization: AUTH,
      },
    })
      .then((results) => {
        productInfo = results.data;
      })
      .then(() => {
        axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${productId}/styles`, {
          headers: {
            Authorization: AUTH,
          },
        }).then((results) => {
          productStyles = results.data.results;
        })
          .then(() => {
            axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/reviews/meta/?product_id=${productId}`, {
              headers: {
                Authorization: AUTH,
              },
            }).then((results) => {
              const { ratings } = results.data;
              this.setState({
                productId: productId,
                productInfo: productInfo,
                productStyles: productStyles,
                rating: averageRating(ratings),
                reviewCount: totalReviews(ratings),
                outfits: localStorage.get('outfitList') || [],
              });
            });
          });
      });
  }

  render() {
    const {
      productId,
      productInfo,
      productStyles,
      rating,
      reviewCount,
      outfits,
    } = this.state;

    if (!productInfo || !productStyles) {
      return <div />;
    }

    return (
      <div className="all-content">
        <div>
          <ProductOverview
            productInfo={productInfo}
            productStyles={productStyles}
            rating={rating}
            reviewCount={reviewCount}
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
          />
          <QandA />
          <RatingAndReview />
        </div>
      </div>
    );
  }
}

export default App;
