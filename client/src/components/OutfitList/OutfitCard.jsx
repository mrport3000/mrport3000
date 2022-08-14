import React from 'react';

function OutfitCard(props) {
  return (
    <div className="duke-card-container">
      <img className="duke-card-image" src="https://m.media-amazon.com/images/I/61k+oZgUJWL._AC_SR1472,1840_.jpg" alt="placeholder" />
      <div className="duke-productcard-inner">
        <p>Jackets</p>
        <p>The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.</p>
        <p>140</p>
        <img className="duke-card-stars" src="https://cdn.searchenginejournal.com/wp-content/uploads/2021/08/a-guide-to-star-ratings-on-google-and-how-they-work-6123be39b9f2d-sej-760x400.jpg" alt="stars" />
      </div>
    </div>
  );
}

export default OutfitCard;
