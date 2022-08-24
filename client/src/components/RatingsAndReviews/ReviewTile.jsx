import React from 'react';
import { format } from 'date-fns';

import './RatingAndReview.css';

class ReviewTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    console.log('Yes was clicked!');
  }

  render() {
    //console.log(this.props.review)
    return (
      <div className="eric-RR-tileEntryContainer">
        <div className="eric-RR-tileRatingAndUsername">
          <div className="eric-RR-tileRating">
            {this.props.review.rating} stars
          </div>
          <div className="eric-RR-tileUsername">
            {this.props.review.reviewer_name}, {format ( new Date(this.props.review.date), 'MM/dd/yyyy')}
          </div>
        </div>
        <div className="eric-RR-tileMainBody">
          <div className="eric-RR-tileSummary">
            {this.props.review.summary}
          </div>
          <div className="eric-RR-tileBody">
            {this.props.review.body}
          </div>
          <div className="eric-RR-tileRecommend">
            Recommend: {this.props.review.recommend}
          </div>
        </div>
        <div className="eric-RR-tileResponseAndHelpful">
          <div className="eric-RR-tileResponse">
            <b>Response:</b>
            {this.props.review.response}
          </div>
          <div className="eric-RR-tileHelpful">
            Was this review helpful? <a onClick={this.handleClick}>Yes</a> ({this.props.review.helpfulness}) | <a>Report</a>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewTile;
