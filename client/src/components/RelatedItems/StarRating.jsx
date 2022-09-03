import React from 'react';
import PropTypes from 'prop-types';
import halfStar from '../../../dist/lib/star-half.png';
import fullStar from '../../../dist/lib/star-full.png';
import quarterStar from '../../../dist/lib/star-one-quarter.png';
import threeQuarterStar from '../../../dist/lib/star-three-quarter.png';
import emptyStar from '../../../dist/lib/star-outline.png';
import blankStar from '../../../dist/lib/star-blank.png';

// expect rating to equal avg rating number (example: 4.235)
function StarRating({ rating }) {
  const avgRating = (Math.floor(rating * 4) / 4).toFixed(2);
  const starStorage = [];
  const blankStorage = [blankStar, blankStar, blankStar, blankStar, blankStar];
  let i = 1;

  for (i; i <= 5; i++) {
    if (i <= avgRating) {
      starStorage.push(fullStar);
    } else if (i - avgRating === 0.75) {
      starStorage.push(quarterStar);
    } else if (i - avgRating === 0.5) {
      starStorage.push(halfStar);
    } else if (i - avgRating === 0.25) {
      starStorage.push(threeQuarterStar);
    } else {
      starStorage.push(emptyStar);
    }
  }

  return (
    <div>
      {Boolean(rating) && starStorage.map((starFill, index) => <img key={index} className="rating-star" src={starFill} alt="star-rating" />)}
      {Boolean(!rating) && blankStorage.map((starFill, index) => <img key={index} className="rating-star" src={starFill} alt="star-rating" />)}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
