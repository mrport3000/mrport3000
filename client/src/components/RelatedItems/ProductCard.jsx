import React from 'react';
import { useState } from 'react';
import StarRating from './StarRating.jsx';
import Thumbnails from './Thumbnails.jsx';

// Individual card in related product carousel
function ProductCard({ product, handleModalButtonClick, handleProductCardClick }) {
  console.log('PRODUCT', product);
  const defaultStyle = product.styles.filter((value) => (value['default?']));

  let defaultPhotoURL = defaultStyle.length > 0
    ? defaultStyle[0].photos[0].url : product.styles[0].photos[0].url;

  let [previewPhoto, setPreviewPhoto] = useState(product.newDefaultPhoto || defaultPhotoURL);
  let [isShown, setIsShown] = useState(false);

  // dummy test data for sales price
  // defaultStyle.sale_price = "25.00";

  const salesPrice = defaultStyle.length > 0
    ? defaultStyle.sale_price : product.styles[0].sale_price;

  let priceBlock = <p>{`$${product.default_price}`}</p>;

  if (salesPrice) {
    priceBlock = (
      <p>
        <span className="duke-sale-price">{`$${salesPrice}`}</span>
        <span className="duke-cross-through">{`$${product.default_price}`}</span>
      </p>
    );
  }

  const handleThumbnailClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPreviewPhoto(e.target.value);
    product.newDefaultPhoto = e.target.value;
  };
  console.log('PREVIEW PHOTO', previewPhoto);

  return (
    <div
      role="button"
      tabIndex="-1"
      className="duke-card-container"
      data-testid="product-card"
      onClick={(() => handleProductCardClick(product.id))}
      onKeyPress="INSERT ACCESSIBILITY"
    >
      <div
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className="duke-card-header"
      >
        <img
          className="duke-card-preview-image"
          alt={product.name}
          value={product.id}
          src={previewPhoto}
        />
        {isShown && (
        <Thumbnails
          product={product}
          handleThumbnailClick={handleThumbnailClick}
        />
        )}
      </div>
      <img src="https://static.vecteezy.com/system/resources/previews/001/189/167/non_2x/star-png.png" className="duke-action-icon" onClick={handleModalButtonClick} value={product.id} alt="star-icon" />
      <div className="duke-productcard-body">
        <p>{product.category}</p>
        <div>
          <p><strong>{product.name}</strong></p>
          <p><i>{product.slogan}</i></p>
        </div>
        {priceBlock}
        <div>
          <StarRating rating={product.ratings}/>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
