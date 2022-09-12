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
      rbfilteredReviews: [],
      show: false,
    };
    this.handleModal = this.handleModal.bind(this);
    this.filtered = this.filtered.bind(this);
    this.liftRBFilteredReviews = this.liftRBFilteredReviews.bind(this);
  }

  handleModal(bool) {
    this.setState({ show: bool });
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

  liftRBFilteredReviews(state) {
    console.log('liftedState: ', state);
    for (var key in state) {
      if (state[key] > 0) {
        const filtered = this.props.reviews.filter((review) => review.rating === Number(state[key]));
        let concat = this.state.rbfilteredReviews.concat(filtered);
        // this.setState(prevState => ({
        //   rbfilteredReviews: [prevState.rbfilteredReviews, ...filtered]
        // }), console.log('state after: ', this.state.rbfilteredReviews))
        // this.setState({ rbfilteredReviews: [...filtered] });
        this.setState({rbfilteredReviews: concat})
      }
      //console.log('state after loop: ', this.state.rbfilteredReviews);
    }
  }

  render() {
    // console.log('R&R props: ', this.props)
    const { show, rbfilteredReviews } = this.state;
    if (this.props.reviews.length === 0) {
      return <div />;
    }
    const ratingBreakdown = this.filtered(this.props.reviews);

    return (
      <div className="eric-RR-container">
        <div className="eric-RR-breakdown">
          <div className="eric-RR-ratingBreakdown">
            <RatingBreakdown ratings={ratingBreakdown} liftRating={this.liftRBFilteredReviews} />
          </div>
          <div className="eric-RR-productBreakdown">
            <ProductBreakdown features={this.props.characteristics} />
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
              reviews={rbfilteredReviews.length === 0 ? this.props.reviews : rbfilteredReviews}
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
