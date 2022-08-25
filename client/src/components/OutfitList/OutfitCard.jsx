import React from 'react';
import StarRating from '../RelatedItems/StarRating.jsx';

function OutfitCard({ product, handleRemoveOutfitClick, }) {
  const defaultStyle = product.styles.filter((value) => (value['default?']));

  const defaultPhotoURL = defaultStyle.length > 0
    ? defaultStyle[0].photos[0].url : product.styles[0].photos[0].url;

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
    <div className="duke-card-container">
      <div
        className="duke-card-header"
        style={{ backgroundImage: `url(${defaultPhotoURL})` }}
      >
        <img src="https://cdn.iconscout.com/icon/free/png-256/x-circle-3604634-3005570.png" className="duke-action-icon" onClick={handleRemoveOutfitClick} value={product.id} alt="star-icon" />
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

export default OutfitCard;
