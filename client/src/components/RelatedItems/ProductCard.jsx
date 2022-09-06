import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import StarRating from './StarRating.jsx';
import Thumbnails from './Thumbnails.jsx';
import modalStar from '../../../dist/lib/modal-star.png';

// Individual card in related product carousel
function ProductCard({ product, handleModalButtonClick, handleProductCardClick }) {
  const defaultStyle = product.styles.filter((value) => (value['default?']));

  const defaultPhotoURL = defaultStyle.length > 0
    ? defaultStyle[0].photos[0].url : product.styles[0].photos[0].url;

  const [previewPhoto, setPreviewPhoto] = useState(product.newDefaultPhoto || defaultPhotoURL);
  const [isShown, setIsShown] = useState(false);

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

  return (
    <div
      role="button"
      tabIndex="-1"
      className="duke-card-container"
      data-testid="product-card"
      onClick={(() => handleProductCardClick(product.id))}
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
      <div>
        <img
          src={modalStar}
          className="duke-action-icon"
          onClick={handleModalButtonClick}
          value={product.id}
          alt="star-icon"
        />
      </div>
      <div className="duke-productcard-body">
        <h5>{product.category}</h5>
        <div>
          <h4>{product.name}</h4>
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

// ProductCard.propTypes = {
//   product: PropTypes.shape({}).isRequired,
//   handleModalButtonClick: PropTypes.func.isRequired,
//   handleProductCardClick: PropTypes.func.isRequired,
// };

export default ProductCard;
