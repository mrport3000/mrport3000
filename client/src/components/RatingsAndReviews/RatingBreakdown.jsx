import React from 'react';

// import ratingBreakdownPlaceholder from './assets/Rating-breakdown-placeholder.png';
import './RatingAndReview.css';

function RatingBreakdown(props) {
  //console.log('props: ', props);
  return (
    <div className="eric-RR-productRatingContainer">
      {/* RatingBreakdown Placeholder! */}
      <div className="eric-RR-productRatingAverage">
        <div className="eric-RR-productAverageText">
          4.5
        </div>
        <div className="eric-RR-productStarRating">
          Insert Star Rating Here!
        </div>
      </div>
      <div className="eric-RR-ratingBreakdown">
        {/* <img src={ratingBreakdownPlaceholder} alt="rating placeholder" /> */}
      </div>
    </div>
  );
}

export default RatingBreakdown;
