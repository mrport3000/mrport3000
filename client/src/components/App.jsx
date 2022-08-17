import React from 'react';
import axios from 'axios';
import { AUTH } from '../config.js';
import ProductOverview from './ProductOverview/OverviewIndex.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productInfo: null,
      productStyles: null,
      rating: 5,
      reviewCount: 10,
    };
  }

  componentDidMount() {
    let productInfo;
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/71701', {
      headers: {
        Authorization: AUTH,
      },
    })
      .then((results) => {
        productInfo = results.data;
      })
      .then(() => {
        axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/products/71701/styles', {
          headers: {
            Authorization: AUTH,
          },
        }).then((results) => {
          this.setState({
            productInfo: productInfo,
            productStyles: results.data.results,
          });
        });
      });
  }

  render() {
    const {
      productInfo,
      productStyles,
      rating,
      reviewCount,
    } = this.state;
    if (!productInfo || !productStyles) {
      return <div />;
    }
    return (
      <div>
        <ProductOverview
          productInfo={productInfo}
          productStyles={productStyles}
          rating={rating}
          reviewCount={reviewCount}
        />
      </div>
    );
  }
}

export default App;
