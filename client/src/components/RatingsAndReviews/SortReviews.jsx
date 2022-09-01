import React from 'react';

import ReviewsList from './ReviewsList.jsx';
import './RatingAndReview.css';

class SortReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortTerm: '',
      sortedReviews: [],
    };
    this.flowControl = this.flowControl.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  //Still debugging second part of sort bug
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('Previous State: ', prevState);
  //   if (prevState.sortedReviews !== this.props.reviews) {
  //     this.setState({sortedReviews: [], sortTerm: ''});
  //   }
  // }

  handleChange(e) {
    const { sortTerm } = this.state;
    this.setState({ sortTerm: e.target.value }, () => {
      this.flowControl(sortTerm);
    });
  }

  flowControl(term) {
    const currentReviews = this.props.reviews;
    let sorted;
    if (term === 'relevant') {
      // Still working on relvency sort
    } else if (term === 'newest') {
      sorted = currentReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (term === 'helpful') {
      sorted = currentReviews.sort((a, b) => a.helpfulness - b.helpfulness);
    }

    this.setState({ sortedReviews: sorted }, () => {
      //  console.log('sortedState: ', this.state);
    });
  }

  render() {
    const { sortedReviews } = this.state;
    let dynamicProps;
    if (sortedReviews.length === 0) {
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
            <button type="submit" className="eric-RR-sortAddReview" onClick={() => { this.props.renderModal(true) }}>
              Add a Review +
            </button>
          </div>
        </div>
      </div>

    );
  }
}

export default SortReviews;
