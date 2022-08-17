import React from 'react';
import axios from 'axios';
import RelatedProducts from './RelatedItems/RelatedProducts.jsx';
import OutfitList from './OutfitList/OutfitList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    this.getProductInfo(71697);
    this.getProductStyles(71697);
    this.getRelatedProducts(71697);
  }

  getProductInfo(id) {
    axios.get(`/product-info/${id}`)
      .then((results) => console.log('RESULTS', results.data))
      .catch((err) => console.log('getProducInfo Error', err));
  }

  getProductStyles(id) {
    axios.get(`/product-styles/${id}`)
      .then((results) => console.log('STYLES: ', results.data))
      .catch((err) => console.log('getProductStyles Error', err));
  }

  getRelatedProducts(id) {
    axios.get(`/related-products/${id}`)
      .then((results) => console.log('RELATED: ', results.data))
      .catch((err) => console.log('getRelatedProducts Error', err));
  }

  render() {
    return (
      <div>
        Place Widgets here:
        <RelatedProducts />
        <OutfitList />
      </div>
    );
  }
}

export default App;
