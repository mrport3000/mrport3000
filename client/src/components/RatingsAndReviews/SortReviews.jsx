import React from 'react';

class SortReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortTerm: '',
      sortedReviews: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ sortTerm: e.target.value }, () => {
      console.log('sortTerm: ', this.state.sortTerm);
    });
  }

  render() {
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
          ReviewList Rendered Here!
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
