import React from 'react';

function OutfitCard({ product }) {
  return (
    <div className="duke-card-container">
      <div className="duke-card-header">
        <img className="duke-card-image" src={product.url} alt="placeholder" />
      </div>
      <div className="duke-productcard-body">
        <p>{product.category}</p>
        <p>{product.description}</p>
        <p>{product.default_price}</p>
        <img className="duke-card-stars" src="https://cdn.searchenginejournal.com/wp-content/uploads/2021/08/a-guide-to-star-ratings-on-google-and-how-they-work-6123be39b9f2d-sej-760x400.jpg" alt="stars" />
      </div>
    </div>
  );
}

export default OutfitCard;
