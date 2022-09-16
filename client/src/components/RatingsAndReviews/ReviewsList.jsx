import React from 'react';

import ReviewTile from './ReviewTile.jsx';
import './RatingAndReview.css';

class ReviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    //console.log('Incoming sortedReviews Props: ', this.props.reviews)
    return (
      <div className="eric-RR-reviewListContainer">
        {
            this.props.reviews.map((review) => (
              <ReviewTile review={review} productId={this.props.productId} />
            ))
          }
      </div>
    );
  }
}

export default ReviewsList;
