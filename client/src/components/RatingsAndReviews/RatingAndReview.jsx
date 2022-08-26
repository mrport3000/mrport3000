/* eslint-disable import/extensions */
import React from 'react';

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
  }

  componentDidUpdate(prevProps) {
    if (this.props.reviews !== prevProps.reviews) {
      this.setState({totalReviews: this.props.reviews});
    }
  }

  render() {
    const { totalReviews } = this.state;
    if (this.props.reviews.length === 0 || totalReviews.length === 0) {
      return <div />;
    }
    return (
      <div className="eric-RR-container">
        <div className="eric-RR-breakdown">
          <div className="eric-RR-ratingBreakdown">
            <RatingBreakdown />
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
