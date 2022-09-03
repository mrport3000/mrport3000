import React from 'react';

import axios from 'axios';
import ReviewsList from './ReviewsList.jsx';
import './RatingAndReview.css';

class SortReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedReviews: null,
    };
    this.sortReviews = this.sortReviews.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.productId !== prevProps.productId) {
      this.setState({ sortedReviews: null });
    }
  }

  handleChange(e) {
    this.sortReviews(e.target.value);
  }

  sortReviews(term) {
    let sorted;

    if (term === 'relevant') {
      axios.get(`/reviews/meta/${this.props.productId}`, { params: { sortTerm: 'relevant' } })
        .then((result) => {
          this.setState({ sortedReviews: result.data.results });
        });
    } else if (term === 'newest') {
      axios.get(`/reviews/meta/${this.props.productId}`, { params: { sortTerm: 'newest' } })
        .then((result) => {
          this.setState({ sortedReviews: result.data.results });
        });
    } else if (term === 'helpful') {
      axios.get(`/reviews/meta/${this.props.productId}`, { params: { sortTerm: 'helpful' } })
        .then((result) => {
          this.setState({ sortedReviews: result.data.results });
        });
    }

    this.setState({ sortedReviews: sorted });
  }

  render() {
    const { sortedReviews } = this.state;

    let dynamicProps;
    if (!sortedReviews) {
      dynamicProps = this.props.reviews;
    } else {
      dynamicProps = sortedReviews;
    }

    return (
      <div className="eric-RR-sortContainer">
        <div className="eric-RR-sortReviews">
          <div className="eric-RR-reviewLength">
            {this.props.reviews.length}
            {' '}
            reviews, sorted by
          </div>
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
            <button type="submit" className="eric-RR-sortAddReview" onClick={() => { this.props.renderModal(true); }}>
              Add a Review +
            </button>
          </div>
        </div>
      </div>

    );
  }
}

export default SortReviews;
