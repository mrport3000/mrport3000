import React, { Fragment } from 'react';
import axios from 'axios';
import { IconContext } from 'react-icons';
import { AUTH } from '../../config.js';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Promise } from 'bluebird';
import ProductCard from './ProductCard.jsx';
import CompareModal from './CompareModal.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    // manages indexes shown in carousel
    this.state = {
      startIndex: 0,
      endIndex: 2,
      show: false,
      relatedProducts: [],
    };
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleForwardArrowClick = this.handleForwardArrowClick.bind(this);
    this.handleModalButtonClick = this.handleModalButtonClick.bind(this);
    this.getRelatedProductsInfo = this.getRelatedProductsInfo.bind(this);
    this.getProductInfo = this.getProductInfo.bind(this);
    this.getProductStyles = this.getProductStyles.bind(this);
  }

  componentDidMount() {
    console.log('current id', this.props.productId);
    this.getRelatedProductsInfo(this.props.productId);
  }

  handleBackArrowClick() {
    this.setState({
      startIndex: this.state.startIndex - 1,
      endIndex: this.state.endIndex - 1,
    });
  }

  handleForwardArrowClick() {
    this.setState({
      startIndex: this.state.startIndex + 1,
      endIndex: this.state.endIndex + 1,
    });
  }

  handleModalButtonClick() {
    this.setState({
      show: !this.state.show,
    });
  }

  getProductInfo(id) {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}`, {
      headers: {
        Authorization: AUTH,
      },
    })
      .then((result) => result.data)
      .catch((err) => console.log(err));
  }

  getProductStyles(id) {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/styles`, {
      headers: {
        Authorization: AUTH,
      },
    })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
      });
  }

  getRelatedProductsInfo(id) {
    return axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`, {
      headers: {
        Authorization: AUTH,
      },
    })
      // array of related products [71702, 71702, 71704, 71705, 71697, 71699]
      .then((results) => {
        // remove original product Id
        let newProdsArr = results.data.filter((value) => value !== this.props.productId);
        // remove duplicate product Ids
        let uniqueArr = [...new Set(newProdsArr)];
        return Promise.resolve(uniqueArr);
      })
      .then((arr) => {
        let promiseArr = [];
        // push promises for productID call
        arr.forEach((value) => {
          promiseArr.push(new Promise((resolve) => resolve(this.getProductInfo(value))));
        });
        // push promises for product styles call
        arr.forEach((value) => {
          promiseArr.push(new Promise((resolve) => resolve(this.getProductStyles(value))));
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
          });
        });
        console.log('Related Products: ', finalResult);
        this.setState({
          relatedProducts: finalResult,
        });
      });
  }

  render() {
    const {
      show, startIndex, endIndex, relatedProducts,
    } = this.state;

    const { currProduct } = this.props;

    return (
      <>
        <h4>RELATED PRODUCTS</h4>
        <div className="duke-product-carousel-container">
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
          {
            relatedProducts.map((product, index) => {
              if (index >= startIndex && index <= endIndex) {
                return (
                  <>
                    <CompareModal
                      key={product.id.toString()}
                      show={show}
                      handleModalButtonClick={this.handleModalButtonClick}
                      product={product}
                      currProduct={currProduct}
                    />
                    <ProductCard
                      product={product}
                      key={product.name}
                      handleModalButtonClick={this.handleModalButtonClick}
                    />
                  </>
                );
              }
            })
          }
          {
            endIndex !== (relatedProducts.length - 1)
            && (
            <div className="duke-arrow-container">
              <IconContext.Provider value={{ className: "duke-arrow-button" }}>
                <MdArrowForwardIos onClick={this.handleForwardArrowClick} />
              </IconContext.Provider>
            </div>
            )
          }
        </div>
      </>
    );
  }
}

export default RelatedProducts;
