import React from 'react';
import StarRating from '../RelatedItems/StarRating.jsx';

function Placeholder() {
  return (
    <div className="duke-card-container duke-placeholder">
      <div className="duke-card-header">
        <img
          className="duke-card-preview-image"
          alt="holder-card"
          value="place-holder"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd02zeVLQ2fKKrq6VtQ5fSEvkIGaefaaJTcA&usqp=CAU"
        />
      </div>
      <div className="duke-productcard-body">
        <h5>Fake</h5>
        <div>
          <h4>Fake</h4>
          <p><i>Awesomely fake product</i></p>
        </div>
        <p>$90</p>
        <div>
          <StarRating rating={3.6} />
        </div>
      </div>
    </div>
  );
}

export default Placeholder;
