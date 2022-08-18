import React from 'react';

import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortReviews from './SortReviews.jsx';

class RatingAndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="RR-container">
        <div className="RR-breakdown">
          <div className="RR-rating-breakdown">
            {/* rating breakdown component goes here */}
            <RatingBreakdown />
          </div>
          <div className="RR-product-breakdown">
            {/* product breakdown component goes here */}
            <ProductBreakdown />
          </div>
        </div>
        <div className="RR-sort-reviews">
          {/* sort component goes here */}
          <SortReviews />
        </div>
      </div>
    );
  }
}

export default RatingAndReview;
