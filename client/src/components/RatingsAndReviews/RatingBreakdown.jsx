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
        <div className="eric-RR-breakdownText">
        {props.ratings.recPercent}
        % of reviews recommend this product
        </div>
        <div className="eric-RR-breakdown">
          <div className="eric-RR-5starContainer">
            <div className="eric-RR-5left">
              <a>5 stars</a>
            </div>
            <div className="eric-RR-5center">
              <div className="eric-RR-5bar" />
            </div>
          </div>

          <div className="eric-RR-4starContainer">
            <div className="eric-RR-4left">
              <a>4 stars</a>
            </div>
            <div className="eric-RR-4center">
              <div className="eric-RR-4bar" />
            </div>
          </div>

          <div className="eric-RR-3starContainer">
            <div className="eric-RR-3left">
              <a>3 stars</a>
            </div>
            <div className="eric-RR-3center">
              <div className="eric-RR-3bar" />
            </div>
          </div>

          <div className="eric-RR-2starContainer">
            <div className="eric-RR-2left">
              <a>2 stars</a>
            </div>
            <div className="eric-RR-2center">
              <div className="eric-RR-2bar" />
            </div>
          </div>

          <div className="eric-RR-1starContainer">
            <div className="eric-RR-1left">
              <a>1 stars</a>
            </div>
            <div className="eric-RR-1center">
              <div className="eric-RR-1bar" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RatingBreakdown;
