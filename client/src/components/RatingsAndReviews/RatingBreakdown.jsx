import React from 'react';

import StarRating from '../RelatedItems/StarRating.jsx';
import './RatingAndReview.css';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fiveStar: false,
      fourStar: false,
      threeStar: false,
      twoStar: false,
      oneStar: false,
    };
    this.ratingFrequency = this.ratingFrequency.bind(this);
  }

  ratingFrequency(target, arr) {
    const soloRating = arr.filter((el) => target === el);
    return `${(soloRating.length / this.props.ratings.ratings.length) * 100}%`;
  }

  handleClick() {
    console.log('')
  }

  render() {
    if (this.props.ratings.ratings.length === 0) {
      return <div />;
    }
    return (
      <div className="eric-RR-productRatingContainer">
        <div className="eric-RR-productRatingAverage">
          <div className="eric-RR-productAverageText">
            {this.props.ratings.average}
          </div>
          <div className="eric-RR-productStarRating">
            <StarRating rating={Number(this.props.ratings.average)} />
          </div>
        </div>
        <div className="eric-RR-ratingBreakdown">
          <div className="eric-RR-breakdownText">
            {this.props.ratings.recPercent}
            % of reviews recommend this product
          </div>
          <div className="eric-RR-breakdown">
            <div className="eric-RR-5starContainer">
              <div className="eric-RR-5left">
                <a>5 stars</a>
              </div>
              <div className="eric-RR-5center">
                <div className="eric-RR-5bar" style={{ width: this.ratingFrequency(5, this.props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
              </div>
            </div>

            <div className="eric-RR-4starContainer">
              <div className="eric-RR-4left">
                <a>4 stars</a>
              </div>
              <div className="eric-RR-4center">
                <div className="eric-RR-4bar" style={{ width: this.ratingFrequency(4, this.props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
              </div>
            </div>

            <div className="eric-RR-3starContainer">
              <div className="eric-RR-3left">
                <a>3 stars</a>
              </div>
              <div className="eric-RR-3center">
                <div className="eric-RR-3bar" style={{ width: this.ratingFrequency(3, this.props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
              </div>
            </div>

            <div className="eric-RR-2starContainer">
              <div className="eric-RR-2left">
                <a>2 stars</a>
              </div>
              <div className="eric-RR-2center">
                <div className="eric-RR-2bar" style={{ width: this.ratingFrequency(2, this.props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
              </div>
            </div>

            <div className="eric-RR-1starContainer">
              <div className="eric-RR-1left">
                <a>1 stars</a>
              </div>
              <div className="eric-RR-1center">
                <div className="eric-RR-1bar" style={{ width: this.ratingFrequency(1, this.props.ratings.ratings), height: '25px', backgroundColor: 'black' }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default RatingBreakdown;
