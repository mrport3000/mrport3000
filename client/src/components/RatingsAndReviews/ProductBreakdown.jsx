import React from 'react';

import './RatingAndReview.css';

function ProductBreakdown(props) {
  const formatDiv = (key) => {
    const arr = [];
    if (key === 'Size') {
      arr.push(key, 'A size too small', 'Perfect', 'A size too wide');
    }
    if (key === 'Width') {
      arr.push(key, 'Too narrow', 'Perfect', 'Too Wide');
    }
    if (key === 'Comfort') {
      arr.push(key, 'Uncomfortable', 'Ok', 'Perfect');
    }
    if (key === 'Quality') {
      arr.push(key, 'Poor', 'What I expected', 'Perfect');
    }
    if (key === 'Length') {
      arr.push(key, 'Runs short', 'Perfect', 'Runs long');
    }
    if (key === 'Fit') {
      arr.push(key, 'Runs tight', 'Perfect', 'Runs long');
    }
    return arr;
  };

  return (
    <div className="eric-RR-productBreakdownContainer">
      {
      Object.keys(props.features).map((char, index) => {
        const charFeatures = formatDiv(char);

        return (
          <div className="eric-RR-pbCharacteristic" key={index}>
            <div className="eric-RR-pbTitleBreakdown">{charFeatures[0]}</div>
            <div className="eric-RR-pbScale">
              <div className="eric-RR-pbLeft">
                <div className="eric-RR-lVisual"></div>
                <div className="eric-RR-lText">{charFeatures[1]}</div>
              </div>
              <div className="eric-RR-pbCenter">
                <div className="eric-RR-cVisual"></div>
                <div className="eric-RR-cText">{charFeatures[2]}</div>
              </div>
              <div className="eric-RR-pbRight">
                <div className="eric-RR-rVisual"></div>
                <div className="eric-RR-rText">{charFeatures[3]}</div>
              </div>
            </div>
          </div>
        );
      })
      }
    </div>
  );
}

export default ProductBreakdown;
