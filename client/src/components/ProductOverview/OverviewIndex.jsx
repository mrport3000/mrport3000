/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import ProductDescription from './ProductDescription.jsx';
import ProductInfo from './ProductInfo.jsx';
import UnexpandedGallery from './UnexpandedGallery.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // selectedStyleId: 444243,
      expandedView: false,
    };
  }

  render() {
    const { expandedView } = this.state;
    const {
      productInfo,
      productStyles,
      rating,
      reviewCount,
    } = this.props;
    if (expandedView) {
      return (
        <div>
          <ExpandedGallery photos={productStyles[0].photos} />
          <ProductDescription productInfo={productInfo} rating={rating} reviewCount={reviewCount} />
        </div>
      );
    }
    return (
      <>
        <div className="keith-unexpanded-gallery-div">
          <UnexpandedGallery className="keith-unexpanded-gallery-div" photos={productStyles[0].photos} />
        </div>
        <div className="keith-product-info-div">
          <ProductInfo productInfo={productInfo} rating={rating} reviewCount={reviewCount} />
        </div>
        <ProductDescription productInfo={productInfo} />
      </>
    );
  }
}

export default ProductOverview;
