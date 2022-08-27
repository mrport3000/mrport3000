/* eslint-disable import/extensions */
import React from 'react';

// import StarRating from '../RelatedItems/StarRating.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortReviews from './SortReviews.jsx';
import './RatingAndReview.css';

class RatingAndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: [],
    };
    this.filtered = this.filtered.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.reviews !== prevProps.reviews) {
      this.setState({ totalReviews: this.props.reviews });
    }
  }

  filtered(arr) {
    const rating = [];
    const recPercent = [];
    arr.forEach((review) => {
      rating.push(review.rating);
      if (review.recommend === true) {
        recPercent.push(review.rating);
      }
    });
    const average = rating.slice();
    const initialValue = 0;
    return {
      ratings: rating,
      average: ((average.reduce((pv, cv) => pv + cv, initialValue)) / rating.length).toString().slice(0, 3),
      recPercent: ((recPercent.length / rating.length) * 100).toString().slice(0, 4),
    };
  }

  render() {
    const { totalReviews } = this.state;
    if (this.props.reviews.length === 0 || totalReviews.length === 0) {
      return <div />;
    }
    const ratingBreakdown = this.filtered(this.props.reviews);
    //console.log('ratingBreakdown: ', ratingBreakdown);

    return (
      <div className="eric-RR-container">
        <div className="eric-RR-breakdown">
          <div className="eric-RR-ratingBreakdown">
            <RatingBreakdown ratings={ratingBreakdown} />
          </div>
          <div className="eric-RR-productBreakdown">
            <ProductBreakdown />
          </div>
        </div>
        <div className="eric-RR-sortReviews">
          <SortReviews reviews={totalReviews} />
        </div>
      </div>
    );
  }
}

export default RatingAndReview;
