import React from 'react';
import axios from 'axios';
import localStorage from 'local-storage';
import { AUTH } from '../config.js';
import { averageRating, totalReviews } from '../utilities.js';
import ProductOverview from './ProductOverview/OverviewIndex.jsx';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import OutfitList from './OutfitList/OutfitList.jsx';

const defaultId = 71704;

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
  }

  componentDidMount() {
    let productInfo, productStyles;
    const { productId } = this.state;
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

  handleProductIdChange(newId) {
    this.setState({
      productId: newId,
    });
  }

  handleAddOutfitClick(e) {
    e.preventDefault();
    console.log('ADD OUTFIT CLICK');
    const { productInfo, productStyles, outfits } = this.state;

    // Combine Product Info and Styles to one object
    const currentProduct = productInfo;
    currentProduct.styles = productStyles;

    const updatedOutArr = outfits.slice();
    updatedOutArr.push(currentProduct);

    // add to local storage
    localStorage.set('outfitList', updatedOutArr);

    this.setState({
      outfits: updatedOutArr,
    });
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
          <RelatedProducts productId={productId} currProduct={productInfo} />
          <OutfitList
            productInfo={productInfo}
            productStyles={productStyles}
            outfits={outfits}
            handleAddOutfitClick={this.handleAddOutfitClick}
            handleRemoveOutfitClick={this.handleRemoveOutfitClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
