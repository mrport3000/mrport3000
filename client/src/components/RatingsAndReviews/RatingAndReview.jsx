import React from 'react';

import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortReviews from './SortReviews.jsx';

class RatingAndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    };
  }

  render() {
    return (
      <div className="eric-RR-container">
        <div className="eric-RR-breakdown">
          <div className="eric-RR-ratingBreakdown">
            {/* rating breakdown component goes here */}
            <RatingBreakdown />
          </div>
          <div className="eric-RR-productBreakdown">
            {/* product breakdown component goes here */}
            <ProductBreakdown />
          </div>
        </div>
        <div className="eric-RR-sortReviews">
          {/* sort component goes here */}
          <SortReviews reviews={this.state.reviews}/>
        </div>
      </div>
    );
  }
}

export default RatingAndReview;
