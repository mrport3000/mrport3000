/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import ProductDescription from './ProductDescription.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import UnexpandedGallery from './UnexpandedGallery.jsx';
import AddToCart from './AddToCart.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    const { productStyles } = this.props;
    const firstStyle = productStyles[0];
    for (let i = 0; i < productStyles.length; i += 1) {
      if (productStyles[i]['default?']) {
        productStyles[0] = productStyles[i];
        productStyles[i] = firstStyle;
        break;
      }
    }
    this.state = {
      expandedView: false,
      galleryPhotos: productStyles[0].photos,
      originalPrice: productStyles[0].original_price,
      salePrice: productStyles[0].sale_price,
      styleName: productStyles[0].name,
      skus: productStyles[0].skus,
      productStyles: productStyles,
    };
    this.handleStyleChange = this.handleStyleChange.bind(this);
  }

  handleStyleChange(e) {
    const index = e.target.getAttribute('index');
    const { productStyles } = this.state;
    this.setState({
      galleryPhotos: productStyles[index].photos,
      originalPrice: productStyles[index].original_price,
      salePrice: productStyles[index].sale_price,
      styleName: productStyles[index].name,
      skus: productStyles[index].skus,
    });
  }

  render() {
    const {
      expandedView,
      galleryPhotos,
      originalPrice,
      salePrice,
      styleName,
      skus,
      productStyles,
    } = this.state;
    const {
      productInfo,
      rating,
      reviewCount,
    } = this.props;
    if (expandedView) {
      return (
        <div>
          <ExpandedGallery photos={galleryPhotos} />
          <ProductDescription productInfo={productInfo} rating={rating} reviewCount={reviewCount} />
        </div>
      );
    }
    return (
      <div className="keith-overview-div">
        <div className="keith-top-div">
          <div className="keith-unexpanded-gallery-div">
            <UnexpandedGallery photos={galleryPhotos} />
          </div>
          <div className="keith-product-info-div">
            <ProductInfo
              productInfo={productInfo}
              rating={rating}
              reviewCount={reviewCount}
              originalPrice={originalPrice}
              salePrice={salePrice}
              styleName={styleName}
            />
            <StyleSelector
              productStyles={productStyles}
              handleStyleChange={this.handleStyleChange}
            />
            <AddToCart skus={skus} />
          </div>
        </div>
        <ProductDescription productInfo={productInfo} />
      </div>
    );
  }
}

export default ProductOverview;
