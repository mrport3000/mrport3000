import React from 'react';

import ReviewTile from './ReviewTile.jsx';
import './RatingAndReview.css';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportedId: [],
    };
  }

  render() {
    return (
      <div className="eric-RR-reviewListContainer">
        {
            this.props.reviews.map((review, index) => (
              <ReviewTile key={index} review={review} productId={this.props.productId} />
            ))
          }
      </div>
    );
  }
}

export default ReviewsList;
