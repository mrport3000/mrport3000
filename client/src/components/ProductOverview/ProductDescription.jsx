/* eslint-disable react/prop-types */
import React from 'react';

function ProductDescription({ productInfo }) {
  const { slogan, description, features } = productInfo;
  return (
    <div className="keith-desc-div">
      <div className="keith-summary-div">
        <h4><b>{slogan}</b></h4>
        <p>{description}</p>
      </div>
      <div className="keith-feature-div">
        {features.map((feature) => (
          <p className="keith-feature">{`✔️  ${feature.feature}: ${feature.value}`}</p>
        ))}
      </div>
    </div>
  );
}

export default ProductDescription;
