/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
import React from 'react';
import ProductDescription from './ProductDescription.jsx';
import ProductInfo from './ProductInfo.jsx';
import StyleSelector from './StyleSelector.jsx';
import Gallery from './Gallery.jsx';
import AddToCart from './AddToCart.jsx';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedView: false,
      zoomed: false,
      hover: false,
    };
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.handleUnexpandClick = this.handleUnexpandClick.bind(this);
  }

  handleExpandClick(e) {
    e.stopPropagation();
    const { expandedView } = this.state;
    if (!expandedView) {
      this.setState({
        expandedView: true,
      });
    }
    if (expandedView) {
      this.setState((prevState) => ({
        zoomed: !prevState.zoomed,
      }));
    }
  }

  handleUnexpandClick(e) {
    e.stopPropagation();
    this.setState({
      expandedView: false,
      zoomed: false,
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
      zoomed,
    } = this.state;
    const {
      productInfo,
      styleIndex,
      rating,
      reviewCount,
      productStyles,
      executeScroll,
      handleStyleChange,
      handleAddOutfitClick,
      handleRemoveOutfitClick,
    } = this.props;
    const originalPrice = productStyles[styleIndex].original_price;
    const salePrice = productStyles[styleIndex].sale_price;
    const styleName = productStyles[styleIndex].name;
    const { skus } = productStyles[styleIndex];
    const galleryPhotos = productStyles[styleIndex].photos;
    return (
      <div className="keith-overview-div" onClick={this.handleUnexpandClick}>
        <div className="keith-top-div">
          <Gallery
            photos={galleryPhotos}
            expandedView={expandedView}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            hover={hover}
            zoomed={zoomed}
            handleExpandClick={this.handleExpandClick}
            handleUnexpandClick={this.handleUnexpandClick}
          />
          {!expandedView && (
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
                productStyles={productStyles}
                handleStyleChange={handleStyleChange}
                styleIndex={styleIndex}
              />
              <AddToCart
                productInfo={productInfo}
                key={Object.keys(skus)[styleIndex]}
                skus={skus}
                handleAddOutfitClick={handleAddOutfitClick}
                handleRemoveOutfitClick={handleRemoveOutfitClick}
              />
            </div>
          )}
        </div>
        <ProductDescription
          productInfo={productInfo}
          handleUnexpandClick={this.handleUnexpandClick}
        />
      </div>
    );
  }
}

export default ProductOverview;
