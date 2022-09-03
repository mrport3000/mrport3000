import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Promise } from 'bluebird';
import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';
import { averageRating } from '../../utilities.js'

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // mediaQuery: window.matchMedia('(max-width: 1100px)'),
      defaultEndIndex: 3,
      startIndex: 0,
      endIndex: 3,
      show: false,
      relatedProducts: [],
      cardProduct: {},
    };
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
    this.getRelatedProductsInfo = this.getRelatedProductsInfo.bind(this);
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getProductStyles = this.getProductStyles.bind(this);
  }

  componentDidMount() {
    this.adjustForScreenSize();
    // this.state.mediaQuery.addEventListener('change', () => {
    //   console.log('SCREEN SIZE: ', window.innerWidth);
    //   this.adjustForScreenSize();
    // });
    // setTimeout(() => this.getRelatedProductsInfo(this.props.productId), 2000);
    this.getRelatedProductsInfo(this.props.productId);
  }

  componentDidUpdate(prevProps) {
    const { defaultEndIndex } = this.state;
    if (prevProps.productId !== this.props.productId) {
      this.getRelatedProductsInfo(this.props.productId);
      this.setState({
        startIndex: 0,
        endIndex: defaultEndIndex,
      });
    }
  }

  handleBackArrowClick() {
    this.setState((prevState) => ({
      startIndex: prevState.startIndex - 1,
      endIndex: prevState.endIndex - 1,
    }));
  }

  handleForwardArrowClick() {
    this.setState((prevState) => ({
      startIndex: prevState.startIndex + 1,
      endIndex: prevState.endIndex + 1,
    }));
  }

  handleModalButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();
    const { relatedProducts } = this.state;

    // retrieves productId from product card to pass to modal
    const prodId = e.target.getAttribute('value');
    const newCardProduct = relatedProducts.filter((product) => Number(prodId) === product.id);
    this.setState({ cardProduct: newCardProduct[0] });

    // Show modal
    this.setState((prevState) => ({ show: !prevState.show }));
  }

  getProductInfo(id) {
    return axios.get(`/productinfo/${id}`)
      .then((result) => result.data)
      .catch((err) => console.log(err));
  }

  getProductStyles(id) {
    return axios.get(`/styles/${id}`)
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }

  // need to change id key to make identifiable second
  getAverageReviews(id) {
    return axios.get(`/reviews/${id}`)
      .then((result) => {
        return result.data;
      })
      .then((product) => {
        // replace product_id key to prevent overwriting properties when merging object
        product.review_id = product.product_id;
        product.ratings = averageRating(product.ratings) || 0;
        delete product.product_id;
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRelatedProductsInfo(id) {
    const { productId } = this.props;
    return axios.get(`/related/${id}`)
      // [71702, 71702, 71704, 71705, 71697, 71699]
      .then((results) => {
        // remove original product Id
        const newProdsArr = results.data.filter((value) => value !== productId);
        // remove duplicate product Ids
        const uniqueArr = [...new Set(newProdsArr)];
        return Promise.resolve(uniqueArr);
      })
      .then((arr) => {
        const promiseArr = [];
        // push promises for productID call
        arr.forEach((value) => {
          promiseArr.push(new Promise((resolve) => resolve(this.getProductInfo(value))));
        });
        // push promises for product styles call
        arr.forEach((value) => {
          promiseArr.push(new Promise((resolve) => resolve(this.getProductStyles(value))));
        });
        // push promises for review ratings
        arr.forEach((value) => {
          promiseArr.push(new Promise((resolve) => resolve(this.getAverageReviews(value))));
        });
        return promiseArr;
      })
      .then((promiseArr) => Promise.all(promiseArr))
      .then((result) => {
        const finalResult = [];
        // push productInfo
        result.forEach((value) => {
          if (value.id) {
            finalResult.push({
              id: value.id,
              category: value.category,
              name: value.name,
              description: value.description,
              features: value.features,
              slogan: value.slogan,
              default_price: value.default_price,
            });
          }
        });
        // push styles info
        finalResult.forEach((product) => {
          result.forEach((style) => {
            if (product.id === Number(style.product_id)) {
              product.styles = style.results;
            }
            if (product.id === Number(style.review_id)) {
              product.ratings = style.ratings;
            }
          });
        });
        this.setState({
          relatedProducts: finalResult,
        });
      });
  }

  adjustForScreenSize() {
    const { startIndex } = this.state;
    console.log('SCREEN SIZE: ', window.innerWidth);
    console.log('Enter ADJUST SCREEN');
    let screenSize = 800;
    const media = window.matchMedia(`(max-width: ${screenSize}px)`);

    if (window.matchMedia('(max-width: 800px)').matches) {
      console.log('HIT 800');
      this.setState({
        defaultEndIndex: 1,
        endIndex: startIndex + 1,
      });
    } else if (window.matchMedia('(max-width: 1100px)').matches) {
      console.log('HIT 1100');
      this.setState({
        defaultEndIndex: 2,
        endIndex: startIndex + 2,
      });
      screenSize = 1100;
    } else {
      console.log('HIT MAX');
      this.setState({
        defaultEndIndex: 3,
        endIndex: startIndex + 3,
      });
    }
    console.log('HIT EVENT LISTENER');
    media.addEventListener('change', () => {
      this.adjustForScreenSize();
    });
    console.log('----------');
  }

  render() {
    const {
      show, startIndex, endIndex, relatedProducts, cardProduct,
    } = this.state;

    const { currProduct, handleProductCardClick } = this.props;

    return (
      <div className="duke-products-container">
        <div className="duke-products-inner">
          <h4>RELATED PRODUCTS</h4>
          <div className="duke-product-carousel-container" data-testid="product-carousel">
            {
              startIndex > 0
              && (
              <div className="duke-arrow-container">
                <IconContext.Provider value={{ className: "duke-arrow-button" }}>
                  <MdArrowBackIos onClick={this.handleBackArrowClick} />
                </IconContext.Provider>
              </div>
              )
            }
            <CompareModal
              show={show}
              handleModalButtonClick={this.handleModalButtonClick}
              cardProduct={cardProduct}
              currProduct={currProduct}
            />
            {
              relatedProducts.map((product, index) => {
                if (index >= startIndex && index <= endIndex) {
                  return (
                    <ProductCard
                      product={product}
                      key={product.name}
                      handleModalButtonClick={this.handleModalButtonClick}
                      handleProductCardClick={handleProductCardClick}
                    />
                  );
                }
              })
            }
            {
              endIndex !== (relatedProducts.length - 1)
              && endIndex < relatedProducts.length
              && (
              <div className="duke-arrow-container">
                <IconContext.Provider value={{ className: "duke-arrow-button" }}>
                  <MdArrowForwardIos onClick={this.handleForwardArrowClick} />
                </IconContext.Provider>
              </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

RelatedProducts.propTypes = {
  productId: PropTypes.number.isRequired,
  currProduct: PropTypes.shape({}).isRequired,
  handleProductCardClick: PropTypes.func.isRequired,
};

export default RelatedProducts;
