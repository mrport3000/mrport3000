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
    this.state = {
      expandedView: false,
      hover: false,
      thumbIndex: 0,
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.handleThumbChange = this.handleThumbChange.bind(this);
  }

  handleThumbChange(e) {
    const thumbIndex = e.target.getAttribute('thumbIndex');
    this.setState({
      thumbIndex,
    });
  }

  onMouseEnter() {
    this.setState({
      hover: true,
    });
  }

  onMouseLeave() {
    this.setState({
      hover: false,
    });
  }

  render() {
    const {
      expandedView,
      hover,
      thumbIndex,
    } = this.state;
    const {
      productInfo,
      rating,
      reviewCount,
      productStyles,
      styleIndex,
      handleStyleChange,
      executeScroll,
      handleAddOutfitClick,
      handleRemoveOutfitClick,
    } = this.props;
    const originalPrice = productStyles[styleIndex].original_price;
    const salePrice = productStyles[styleIndex].sale_price;
    const styleName = productStyles[styleIndex].name;
    const { skus } = productStyles[styleIndex];
    const reorderedStyles = productStyles;
    const firstStyle = reorderedStyles[0];
    for (let i = 0; i < productStyles.length; i += 1) {
      if (productStyles[i]['default?']) {
        reorderedStyles[0] = productStyles[i];
        reorderedStyles[i] = firstStyle;
        break;
      }
    }
    const galleryPhotos = reorderedStyles[styleIndex].photos;
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
            <UnexpandedGallery
              photos={galleryPhotos}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              hover={hover}
              thumbIndex={thumbIndex}
              handleThumbChange={this.handleThumbChange}
            />
          </div>
          <div className="keith-product-info-div">
            <ProductInfo
              productInfo={productInfo}
              rating={rating}
              reviewCount={reviewCount}
              originalPrice={originalPrice}
              salePrice={salePrice}
              styleName={styleName}
              executeScroll={executeScroll}
            />
            <StyleSelector
              productStyles={reorderedStyles}
              handleStyleChange={handleStyleChange}
              styleIndex={styleIndex}
            />
            <AddToCart
              key={Object.keys(skus)[styleIndex]}
              skus={skus}
              handleAddOutfitClick={handleAddOutfitClick}
              handleRemoveOutfitClick={handleRemoveOutfitClick}
            />
          </div>
        </div>
        <ProductDescription productInfo={productInfo} />
      </div>
    );
  }
}

export default ProductOverview;
