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
    // create promise array storage
    // create master result array
    let stylesArr = [];
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/${id}/related`, {
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
      .then((promiseArr) => {
        console.log('PROMISE ARR', promiseArr);
        return Promise.all(promiseArr);
      })
      .then((result) => console.log('RESULT:', result));
        // iterate through related product id array
          // create promise for axios call
          // push to correct array variable
      // Promise.all
        // iterate through array
          // if empty array
            // create object
          // if id key exists
            // create an object and push to master result array
          // if product id === id
            // add to object desired information
      // set state with master array
  }

  render() {
    return (
      <>
        <CompareModal show={this.state.show} handleModalButtonClick={this.handleModalButtonClick} />
        <h4>RELATED PRODUCTS</h4>
        <div className="duke-product-carousel-container">
          {
            this.state.startIndex > 0
            && (
            <div className="duke-arrow-container">
              <IconContext.Provider value={{ className: "duke-arrow-button" }}>
                <MdArrowBackIos onClick={this.handleBackArrowClick} />
              </IconContext.Provider>
            </div>
            )
          }
          {
            dummyData.map((product, index) => {
              if (index >= this.state.startIndex && index <= this.state.endIndex) {
                return (
                  <ProductCard
                    product={product}
                    key={index}
                    handleModalButtonClick={this.handleModalButtonClick}
                  />
                );
              }
            })
          }
          {
            this.state.endIndex !== (dummyData.length - 1)
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



const dummyData = [
  {
    category: 'Jacket 0',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cool-jackets-1601401814.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  }, {
    category: 'Jacket 1',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/biker-jackets-1657569423.png?crop=0.819xw:1.00xh;0.181xw,0&resize=640:*',
  }, {
    category: 'Jacket 2',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://n.nordstrommedia.com/id/sr3/603baeb0-804c-4585-8da8-00038d1500cf.jpeg?h=365&w=240&dpr=2',
  }, {
    category: 'Jacket 3',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://m.media-amazon.com/images/I/617SHXZ3mXL._AC_UL320_.jpg',
  }, {
    category: 'Jacket 4',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    default_price: 140,
    url: 'https://imageio.forbes.com/specials-images/imageserve/621907c6a1c1d351180dadb8/Buck-Mason-Dry-Waxed-Canvas-N1-Deck-Jacket-10/960x0.jpg?format=jpg&width=960',
  },
];