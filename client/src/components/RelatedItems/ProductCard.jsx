import React from 'react';

// Individual card in related product carousel
function ProductCard({ product, handleModalButtonClick }) {
  const defaultPhoto = product.styles.filter((value) => (value['default?']));

  const defaultPhotoURL = defaultPhoto.length > 0
    ? defaultPhoto[0].photos[0].url : product.styles[0].photos[0].url;

  return (
    <div className="duke-card-container">
      <div
        className="duke-card-header"
        style={{ backgroundImage: `url(${defaultPhotoURL})` }}
      >
        <img src="https://static.vecteezy.com/system/resources/previews/001/189/167/non_2x/star-png.png" className="duke-action-icon" onClick={handleModalButtonClick} value={product.id} alt="star-icon" />
      </div>
      <div className="duke-productcard-body">
        <p>{product.category}</p>
        <div>
          <p><strong>{product.name}</strong></p>
          <p><i>{product.slogan}</i></p>
        </div>
        <p>{product.default_price}</p>
        <div>
          <img className="duke-card-stars" src="https://cdn.searchenginejournal.com/wp-content/uploads/2021/08/a-guide-to-star-ratings-on-google-and-how-they-work-6123be39b9f2d-sej-760x400.jpg" alt="stars" />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
