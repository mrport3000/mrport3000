import React from 'react';

import ReviewsList from './ReviewsList.jsx';
import './RatingAndReview.css';

class SortReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: [...this.props.reviews],
      sortTerm: '',
      sortedReviews: [],
    };
    this.flowControl = this.flowControl.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ sortTerm: e.target.value }, () => {
      this.flowControl(this.state.sortTerm);
    });
  }

  flowControl(term) {
    const { totalReviews } = this.state;
    const currentReviews = totalReviews;
    let sorted;
    if (term === 'relevent') {
      // Still working on relvency sort
    } else if (term === 'newest') {
      sorted = currentReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (term === 'helpful') {
      sorted = currentReviews.sort((a, b) => b.helpfulness - a.helpfulness);
    }

    this.setState({ sortedReviews: sorted });
  }

  render() {
    let dynamicProps;
    if (this.state.sortedReviews.length === 0) {
      dynamicProps = this.props.reviews;
    } else {
      dynamicProps = this.state.sortedReviews;
    }

    return (
      <div className="eric-RR-sortContainer">
        <div className="eric-RR-sortReviews">

          {this.props.reviews.length}
          {' '}
          reviews, sorted by
          <div className="eric-RR-sortedby" onChange={this.handleChange}>
            <label>
              <select>
                <option value="select">select</option>
                <option value="relevant">relevant</option>
                <option value="newest">newest</option>
                <option value="helpful">helpful</option>
              </select>
            </label>
          </div>
        </div>
        <div className="eric-RR-reviewContainer">
          <ReviewsList reviews={dynamicProps} />
        </div>
        <div className="eric-RR-sortBottomNavBar">
          <div className="eric-RR-moreReviewsContainer">
            <button type="submit" className="eric-RR-sortMoreReviews">
              More Reviews
            </button>
          </div>
          <div className="eric-RR-addReviewContainer">
            <button type="submit" className="eric-RR-sortAddReview">
              Add a Review +
            </button>
          </div>
        </div>
      </div>

    );
  }
}

export default SortReviews;
