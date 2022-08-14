import React from 'react';
import ProductCard from './ProductCard.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h4>RELATED PRODUCTS</h4>
        <ProductCard />
      </div>
    );
  }
}

export default RelatedProducts;
