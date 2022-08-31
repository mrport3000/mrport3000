/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';

function ProductDescription({ productInfo, handleUnexpandClick }) {
  const { slogan, description, features } = productInfo;
  return (
    <div className="keith-desc-div" onClick={handleUnexpandClick}>
      <div className="keith-summary-div">
        <h4><b>{slogan}</b></h4>
        <p>{description}</p>
      </div>
      <div className="keith-feature-div">
        {features.map((feature, index) => (
          <p key={index} className="keith-feature">{`✔️  ${feature.feature}: ${feature.value}`}</p>
        ))}
      </div>
    </div>
  );
}

export default ProductDescription;
