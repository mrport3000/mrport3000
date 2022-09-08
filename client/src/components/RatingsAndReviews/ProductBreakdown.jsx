import React from 'react';

import './RatingAndReview.css';
// import productBreakdownPlaceholder from './assets/Product-breakdown-placeholder.png';

function ProductBreakdown(props) {
  // console.log('Product Breakdown props: ', props.features);

  const formatDiv = (key) => {
    const arr = [];
    if (key === 'Size') {
      arr.push('A size too small', 'Perfect', 'A size too wide');
    }
    if (key === 'Width') {
      arr.push('Too narrow', 'Perfect', 'Too Wide');
    }
    if (key === 'Comfort') {
      arr.push('Uncomfortable', 'Ok', 'Perfect');
    }
    if (key === 'Quality') {
      arr.push('Poor', 'What I expected', 'Perfect');
    }
    if (key === 'Length') {
      arr.push('Runs short', 'Perfect', 'Runs long');
    }
    if (key === 'Fit') {
      arr.push('Runs tight', 'Perfect', 'Runs long');
    }
    // console.log('props.feature values: ', key);
    // console.log('inner arr: ', arr)
    return arr;
  };

  return (
    <div className="eric-RR-productBreakdownContainer">
      {
      Object.keys(props.features).map((char) => {
        // console.log('map char: ', char);
        let charFeatures = formatDiv(char);

        return (
          <div className="eric-RR-pbCharacteristic">
          <div className="eric-RR-pbLeft">
            <div className="eric-RR-lVisual"></div>
            <div className="eric-RR-lText">{charFeatures[0]}</div>
          </div>
          <div className="eric-RR-pbCenter">
            <div className="eric-RR-cVisual"></div>
            <div className="eric-RR-cText">{charFeatures[1]}</div>
          </div>
          <div className="eric-RR-pbRight">
            <div className="eric-RR-rVisual"></div>
            <div className="eric-RR-rText">{charFeatures[2]}</div>
          </div>
        </div>
        );
      })
      }
    </div>
  );
}

export default ProductBreakdown;
