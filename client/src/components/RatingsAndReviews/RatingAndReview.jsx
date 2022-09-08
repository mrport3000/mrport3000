/* eslint-disable import/extensions */
import React from 'react';

// import StarRating from '../RelatedItems/StarRating.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import SortReviews from './SortReviews.jsx';
import ReviewModal from './ReviewModal.jsx';
import './RatingAndReview.css';

class RatingAndReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: [],
      show: false,
    };
    this.handleModal = this.handleModal.bind(this);
    this.filtered = this.filtered.bind(this);
  }

  handleModal(bool) {
    this.setState({ show: bool});
  }

  filtered(arr) {
    const rating = [];
    const recPercent = [];
    arr.forEach((review) => {
      rating.push(review.rating);
      if (review.recommend === true) {
        recPercent.push(review.rating);
      }
    });
    const average = rating.slice();
    const initialValue = 0;
    return {
      ratings: rating,
      average: ((average.reduce((pv, cv) => pv + cv, initialValue)) / rating.length).toString().slice(0, 3),
      recPercent: ((recPercent.length / rating.length) * 100).toString().slice(0, 4),
    };
  }

  render() {
    // console.log('R&R props: ', this.props)
    const { show } = this.state;
    if (this.props.reviews.length === 0) {
      return <div />;
    }
    const ratingBreakdown = this.filtered(this.props.reviews);

    return (
      <div className="eric-RR-container">
        <div className="eric-RR-breakdown">
          <div className="eric-RR-ratingBreakdown">
            <RatingBreakdown ratings={ratingBreakdown} />
          </div>
          <div className="eric-RR-productBreakdown">
            <ProductBreakdown />
          </div>
        </div>
        <div className="eric-RR-sortReviews">
          <div className="eric-RR-modalContainer">
            <ReviewModal
              show={show}
              closeModal={this.handleModal}
              productName={this.props.product}
              productId={this.props.productId}
              characteristics={this.props.characteristics}
            />
          </div>
          <div className="eric-RR-sort">
            <SortReviews
              reviews={this.props.reviews}
              renderModal={this.handleModal}
              productId={this.props.productId}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RatingAndReview;
