import React from 'react';

import { format } from 'date-fns';
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

  // componentDidUpdate(prevProps, prevState, ss) {
  //   console.log('prevProps: ', prevProps);
  //   console.log('prevState: ', prevState);
  //   console.log('snapshot: ', ss);
  // }

  handleChange(e) {
    this.setState({ sortTerm: e.target.value }, () => {
      // eslint-disable-next-line react/destructuring-assignment
      console.log('sortTerm: ', this.state);
      this.flowControl(this.state.sortTerm);
    });
  }

  flowControl(term) {
    const currentReviews = this.state.totalReviews;
    let sorted;
    if (term === 'relevent') {
      console.log('relevent target matched');
    } else if (term === 'newest') {
      sorted = currentReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (term === 'helpful') {
      sorted = currentReviews.sort((a, b) => b.helpfulness - a.helpfulness);
    }

    this.setState({ sortedReviews: sorted }, () => {
      console.log('updated sortedReviews: ', this.state.sortedReviews);
    });
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
          {/* SortReviews Component here */}
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
