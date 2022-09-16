/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import { MdCheck } from 'react-icons/md';

function ProductDescription({ productInfo, handleUnexpandClick }) {
  const { slogan, description, features } = productInfo;
  return (
    <div className="keith-desc-div" onClick={handleUnexpandClick}>
      <div className="keith-summary-div">
        <h4><b>{slogan}</b></h4>
        <p>{description}</p>
      </div>
      <div className="keith-feature-div">
        {features.map((feature, index) => {
          if (feature.value && feature.value[0] === '"') {
            feature.value = feature.value.slice(1, -1);
          }
          return (
            feature.value && (
              <div className="keith-feature" key={index}>
                <MdCheck />
                <b>{`  ${feature.feature}: `}</b>
                <span>{`${feature.value}`}</span>
              </div>
            ));
        })}
      </div>
    </div>
  );
}

export default ProductDescription;
