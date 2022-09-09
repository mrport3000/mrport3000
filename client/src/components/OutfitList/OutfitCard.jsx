import React from 'react';
import PropTypes from 'prop-types';
import StarRating from '../RelatedItems/StarRating.jsx';
import circleX from '../../../dist/lib/circle-x.png';

function OutfitCard({ product, handleRemoveOutfitClick }) {
  const defaultStyle = product.styles.filter((value) => (value['default?']));

  const defaultPhotoURL = defaultStyle.length > 0
    ? defaultStyle[0].photos[0].url : product.styles[0].photos[0].url;

  const placeHolderPhoto = "https://media.istockphoto.com/photos/coming-soon-neon-sign-the-banner-shining-light-signboard-collection-picture-id1332167985?b=1&k=20&m=1332167985&s=170667a&w=0&h=O-084eNJBhGZGJbJvNvUC1P6d4aSo6XkV4Kom7ZZcIQ=";

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

  return (
    <div className="duke-card-container" data-testid="outfit-card">
      <div className="duke-outfit-header">
        <img
          className="duke-outfit-preview-image"
          alt={product.name}
          value={product.id}
          src={defaultPhotoURL || placeHolderPhoto}
        />
        <img src={circleX} className="duke-action-icon" onClick={handleRemoveOutfitClick} value={product.id} alt="star-icon" />
      </div>
      <div className="duke-productcard-body">
        <p>{product.category}</p>
        <div>
          <p><strong>{product.name}</strong></p>
          <p><i>{product.slogan}</i></p>
        </div>
        {priceBlock}
        <StarRating rating={product.rating} />
      </div>
    </div>
  );
}

// OutfitCard.propTypes = {
//   product: PropTypes.shape({}).isRequired,
//   handleRemoveOutfitClick: PropTypes.func.isRequired,
// };

export default OutfitCard;
