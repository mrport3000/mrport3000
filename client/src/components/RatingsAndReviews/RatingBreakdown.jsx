import React from 'react';

import StarRating from '../RelatedItems/StarRating.jsx';
import './RatingAndReview.css';

function RatingBreakdown(props) {
  //console.log('RBreakdown props: ', props.ratings);

  function ratingFrequency(target, arr) {
    const soloRating = arr.filter((el) => target === el);
    return `${(soloRating.length / props.ratings.ratings.length) * 100}%`;
  }

  if (props.ratings.ratings.length === 0) {
    return <div />;
  }
  return (
    <div className="eric-RR-productRatingContainer">
      <div className="eric-RR-productRatingAverage">
        <div className="eric-RR-productAverageText">
          {props.ratings.average}
        </div>
        <div className="eric-RR-productStarRating">
          <StarRating rating={Number(props.ratings.average)} />
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
              <div className="eric-RR-5bar" style={{ width: ratingFrequency(5, props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
            </div>
          </div>

          <div className="eric-RR-4starContainer">
            <div className="eric-RR-4left">
              <a>4 stars</a>
            </div>
            <div className="eric-RR-4center">
              <div className="eric-RR-4bar" style={{ width: ratingFrequency(4, props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
            </div>
          </div>

          <div className="eric-RR-3starContainer">
            <div className="eric-RR-3left">
              <a>3 stars</a>
            </div>
            <div className="eric-RR-3center">
              <div className="eric-RR-3bar" style={{ width: ratingFrequency(3, props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
            </div>
          </div>

          <div className="eric-RR-2starContainer">
            <div className="eric-RR-2left">
              <a>2 stars</a>
            </div>
            <div className="eric-RR-2center">
              <div className="eric-RR-2bar" style={{ width: ratingFrequency(2, props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
            </div>
          </div>

          <div className="eric-RR-1starContainer">
            <div className="eric-RR-1left">
              <a>1 stars</a>
            </div>
            <div className="eric-RR-1center">
              <div className="eric-RR-1bar" style={{ width: ratingFrequency(1, props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default RatingBreakdown;
